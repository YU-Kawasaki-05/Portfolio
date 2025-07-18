import Parser from 'rss-parser';
import path from 'path';

const RSS_URL = 'https://note.com/kawa_04wsdase/rss';
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/notes.json');

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NoteItem = { [key: string]: any } & {
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  content: string;
  contentSnippet: string;
};

export async function fetchNotes() {
  // Note: This function should only be used in Node.js environment (build time)
  if (typeof window !== 'undefined') {
    console.warn('fetchNotes should not be called in browser environment');
    return;
  }

  console.log(`[+] Fetching RSS feed from: ${RSS_URL}`);
  const parser = new Parser<Record<string, unknown>, NoteItem>();
  
  try {
    const feed = await parser.parseURL(RSS_URL);
    if (!feed?.items) {
      console.error('[-] Failed to fetch or parse RSS feed. Items are empty.');
      return;
    }
    
    console.log(`[+] Found ${feed.items.length} items. Processing...`);

    const articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      isoDate: item.isoDate,
      contentSnippet: item.contentSnippet?.substring(0, 150),
      source: 'note.com', // 識別子を追加
    }));

    // Use dynamic import for fs/promises to avoid build issues
    const { writeFile } = await import('fs/promises');
    await writeFile(OUTPUT_PATH, JSON.stringify(articles, null, 2), 'utf-8');
    console.log(`[+] Successfully saved ${articles.length} articles to ${OUTPUT_PATH}`);

  } catch (error) {
    console.error('[-] An error occurred during the fetch process:', error);
  }
}

// Execute if called directly
if (require.main === module) {
  fetchNotes();
}