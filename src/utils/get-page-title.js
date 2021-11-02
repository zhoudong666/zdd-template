import defaultSettings from '@/settings'

const title = defaultSettings.title || 'default title'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return title
}
