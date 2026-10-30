export function profileLanguage(hash: string): 'en' | 'zh' {
  return new URLSearchParams(hash.split('?')[1]).get('lang') === 'en' ? 'en' : 'zh';
}
export function localizedProfile<T extends {translations?: {en?: Record<string, unknown>}}>(record: T, language: 'en' | 'zh'): T {
  return language === 'en' && record.translations?.en ? {...record, ...record.translations.en} : record;
}
