/**
 * presets.js
 * Single source of truth for all image size presets.
 * Extend this file to add new categories or presets for future tools.
 */

export const PRESET_CATEGORIES = {
  SOCIAL: 'social',
  SHAPES: 'shapes',
  CUSTOM: 'custom',
};

export const PRESETS = {
  [PRESET_CATEGORIES.SOCIAL]: [
    { id: 'fb-post',     label: 'Facebook Post',        width: 1200, height: 630,  icon: 'facebook',  color: '#1877F2' },
    { id: 'fb-cover',    label: 'Facebook Cover',       width: 820,  height: 312,  icon: 'facebook',  color: '#1877F2' },
    { id: 'ig-square',   label: 'Instagram Square',     width: 1080, height: 1080, icon: 'instagram', color: '#E1306C' },
    { id: 'ig-portrait', label: 'Instagram Portrait',   width: 1080, height: 1350, icon: 'instagram', color: '#E1306C' },
    { id: 'ig-story',    label: 'Instagram Story',      width: 1080, height: 1920, icon: 'instagram', color: '#E1306C' },
    { id: 'li-post',     label: 'LinkedIn Post',        width: 1200, height: 627,  icon: 'linkedin',  color: '#0A66C2' },
    { id: 'li-banner',   label: 'LinkedIn Banner',      width: 1584, height: 396,  icon: 'linkedin',  color: '#0A66C2' },
    { id: 'x-post',      label: 'X / Twitter Post',    width: 1600, height: 900,  icon: 'twitter',   color: '#000000' },
    { id: 'x-header',    label: 'X / Twitter Header',  width: 1500, height: 500,  icon: 'twitter',   color: '#000000' },
    { id: 'yt-thumb',    label: 'YouTube Thumbnail',    width: 1280, height: 720,  icon: 'youtube',   color: '#FF0000' },
    { id: 'yt-banner',   label: 'YouTube Banner',       width: 2560, height: 1440, icon: 'youtube',   color: '#FF0000' },
  ],
  [PRESET_CATEGORIES.SHAPES]: [
    { id: 'sq-1000',     label: 'Square',               width: 1000, height: 1000, icon: 'square',    color: '#6366F1' },
    { id: 'portrait',    label: 'Portrait',             width: 800,  height: 1200, icon: 'portrait',  color: '#8B5CF6' },
    { id: 'landscape',   label: 'Landscape',            width: 1200, height: 800,  icon: 'landscape', color: '#06B6D4' },
    { id: 'profile-pic', label: 'Profile Picture',      width: 400,  height: 400,  icon: 'circle',    color: '#10B981' },
    { id: 'story',       label: 'Story Format',         width: 1080, height: 1920, icon: 'phone',     color: '#F59E0B' },
    { id: 'banner',      label: 'Banner',               width: 1920, height: 480,  icon: 'banner',    color: '#EF4444' },
  ],
};

export const CATEGORY_LABELS = {
  [PRESET_CATEGORIES.SOCIAL]: 'Social Media',
  [PRESET_CATEGORIES.SHAPES]: 'General Shapes',
  [PRESET_CATEGORIES.CUSTOM]: 'Custom Size',
};
