/**
 * Converts Google Drive share URLs to direct image URLs.
 * Also passes through normal URLs and data URIs unchanged.
 */
export function convertImageUrl(url: string): string {
  if (!url) return url;

  // Google Drive file URL: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const driveFileMatch = url.match(
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
  );
  if (driveFileMatch) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // Google Drive open URL: https://drive.google.com/open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}`;
  }

  // Google Drive uc export URL: https://drive.google.com/uc?id=FILE_ID&export=view
  const driveUcMatch = url.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}`;
  }

  // Already a direct URL or other format — return as-is
  return url;
}

/**
 * Checks if a URL is a Google Drive link that needs conversion.
 */
export function isGoogleDriveUrl(url: string): boolean {
  return /drive\.google\.com\/(file\/d\/|open\?id=|uc\?)/.test(url);
}
