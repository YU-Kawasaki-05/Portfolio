export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'おはようございます';
  } else if (hour < 18) {
    return 'こんにちは';
  } else {
    return 'こんばんは';
  }
}

export function formatLastUpdated(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getRandomAnimationDelay(): number {
  return Math.random() * 0.5; // 0-0.5 seconds
}