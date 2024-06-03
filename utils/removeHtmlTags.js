export default function removeHtmlTags(text) {
  return text?.replace(/<[^>]*>/g, '');
}