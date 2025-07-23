#!/usr/bin/env tsx
/**
 * File Migration Helper Script
 * 
 * This script helps migrate files from the old component-based structure
 * to the new feature-based architecture.
 */

import fs from 'fs/promises';
import path from 'path';

interface MigrationRule {
  from: string;
  to: string;
  type: 'file' | 'directory';
  updateImports?: boolean;
}

const migrationRules: MigrationRule[] = [
  // UI Components
  {
    from: 'src/components/ui',
    to: 'src/shared/components/ui',
    type: 'directory',
    updateImports: true
  },
  
  // Layout Components
  {
    from: 'src/components/layout',
    to: 'src/shared/components/layout',
    type: 'directory',
    updateImports: true
  },
  
  // 3D Components
  {
    from: 'src/components/hero3d.tsx',
    to: 'src/shared/components/3d/hero3d.tsx',
    type: 'file',
    updateImports: true
  },
  
  // Navigation Components
  {
    from: 'src/components/header-nav.tsx',
    to: 'src/features/navigation/components/HeaderNav.tsx',
    type: 'file',
    updateImports: true
  },
  {
    from: 'src/components/navigation-cards.tsx',
    to: 'src/features/navigation/components/NavigationCards.tsx',
    type: 'file',
    updateImports: true
  },
  
  // Utilities
  {
    from: 'src/lib',
    to: 'src/shared/lib',
    type: 'directory',
    updateImports: true
  }
];

/**
 * Check if a file or directory exists
 */
async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create directory if it doesn't exist
 */
async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory ${dirPath}:`, error);
  }
}

/**
 * Copy file from source to destination
 */
async function copyFile(from: string, to: string): Promise<void> {
  try {
    const toDir = path.dirname(to);
    await ensureDir(toDir);
    await fs.copyFile(from, to);
    console.log(`✅ Copied: ${from} → ${to}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${from} → ${to}:`, error);
  }
}

/**
 * Copy directory recursively
 */
async function copyDirectory(from: string, to: string): Promise<void> {
  try {
    await ensureDir(to);
    const entries = await fs.readdir(from, { withFileTypes: true });
    
    for (const entry of entries) {
      const fromPath = path.join(from, entry.name);
      const toPath = path.join(to, entry.name);
      
      if (entry.isDirectory()) {
        await copyDirectory(fromPath, toPath);
      } else {
        await copyFile(fromPath, toPath);
      }
    }
    
    console.log(`✅ Copied directory: ${from} → ${to}`);
  } catch (error) {
    console.error(`❌ Failed to copy directory ${from} → ${to}:`, error);
  }
}

/**
 * Update import statements in a file
 */
async function updateImports(filePath: string, fromPath: string, toPath: string): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Convert paths to import patterns
    const oldImportPattern = fromPath.replace('src/', '@/').replace('.tsx', '').replace('.ts', '');
    const newImportPattern = toPath.replace('src/', '@/').replace('.tsx', '').replace('.ts', '');
    
    // Update various import patterns
    const patterns = [
      {
        regex: new RegExp(`from\\s+['"]${oldImportPattern}['"]`, 'g'),
        replacement: `from '${newImportPattern}'`
      },
      {
        regex: new RegExp(`import\\s+['"]${oldImportPattern}['"]`, 'g'),
        replacement: `import '${newImportPattern}'`
      },
      {
        regex: new RegExp(`@/${fromPath.replace('src/', '')}`, 'g'),
        replacement: `@/${toPath.replace('src/', '')}`
      }
    ];
    
    let updatedContent = content;
    let hasChanges = false;
    
    patterns.forEach(({ regex, replacement }) => {
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, replacement);
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      await fs.writeFile(filePath, updatedContent, 'utf-8');
      console.log(`✅ Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to update imports in ${filePath}:`, error);
  }
}

/**
 * Find all TypeScript/React files that might need import updates
 */
async function findFilesToUpdate(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and build directories
        if (!['node_modules', '.next', 'dist', 'build'].includes(entry.name)) {
          files.push(...await findFilesToUpdate(fullPath));
        }
      } else if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Failed to read directory ${dir}:`, error);
  }
  
  return files;
}

/**
 * Main migration function
 */
async function migrate(): Promise<void> {
  console.log('🚀 Starting file migration...\n');
  
  const projectRoot = process.cwd();
  
  for (const rule of migrationRules) {
    const fromPath = path.join(projectRoot, rule.from);
    const toPath = path.join(projectRoot, rule.to);
    
    console.log(`📦 Processing: ${rule.from} → ${rule.to}`);
    
    if (!(await exists(fromPath))) {
      console.log(`⚠️  Source not found: ${fromPath}, skipping...`);
      continue;
    }
    
    if (await exists(toPath)) {
      console.log(`⚠️  Destination already exists: ${toPath}, skipping...`);
      continue;
    }
    
    // Perform the migration
    if (rule.type === 'file') {
      await copyFile(fromPath, toPath);
    } else {
      await copyDirectory(fromPath, toPath);
    }
    
    // Update imports if requested
    if (rule.updateImports) {
      console.log(`🔄 Updating imports for: ${rule.from} → ${rule.to}`);
      const filesToUpdate = await findFilesToUpdate(path.join(projectRoot, 'src'));
      
      for (const file of filesToUpdate) {
        await updateImports(file, rule.from, rule.to);
      }
    }
    
    console.log('');
  }
  
  console.log('✨ Migration completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the migrated files');
  console.log('2. Update any remaining import statements manually');
  console.log('3. Run tests to ensure everything works');
  console.log('4. Remove old files after verification');
}

/**
 * Dry run function to preview what would be migrated
 */
async function dryRun(): Promise<void> {
  console.log('🔍 Dry run - showing what would be migrated:\n');
  
  const projectRoot = process.cwd();
  
  for (const rule of migrationRules) {
    const fromPath = path.join(projectRoot, rule.from);
    const toPath = path.join(projectRoot, rule.to);
    
    const fromExists = await exists(fromPath);
    const toExists = await exists(toPath);
    
    console.log(`📦 ${rule.from} → ${rule.to}`);
    console.log(`   Source exists: ${fromExists ? '✅' : '❌'}`);
    console.log(`   Destination exists: ${toExists ? '⚠️  (would skip)' : '✅'}`);
    console.log(`   Type: ${rule.type}`);
    console.log(`   Update imports: ${rule.updateImports ? '✅' : '❌'}`);
    console.log('');
  }
}

// CLI handling
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('-d');

if (isDryRun) {
  dryRun().catch(console.error);
} else {
  migrate().catch(console.error);
}

export { migrate, dryRun, migrationRules };