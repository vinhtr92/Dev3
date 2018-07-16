CREATE TABLE IF NOT EXISTS `#__imageshow_theme_masonry` (
  `theme_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `image_border` varchar(150) NOT NULL DEFAULT '0',
  `image_rounded_corner` varchar(150) NOT NULL DEFAULT '0',
  `image_border_color` varchar(150) NOT NULL DEFAULT '',
  `image_click_action` varchar(150) NOT NULL,
  `image_source` varchar(150) NOT NULL,
  `open_link_in` varchar(150) NOT NULL,
  `show_caption` varchar(150) NOT NULL DEFAULT 'yes',
  `caption_background_color` varchar(150) NOT NULL DEFAULT '',
  `caption_opacity` varchar(150) NOT NULL DEFAULT '75',
  `caption_show_title` varchar(150) NOT NULL DEFAULT 'yes',
  `caption_title_css` text NOT NULL,
  `caption_show_description` varchar(150) NOT NULL DEFAULT 'yes',
  `caption_description_css` text NOT NULL,
  `caption_description_length_limitation` varchar(150) NOT NULL DEFAULT '50',
  `layout_type` varchar(150) NOT NULL,
  `column_width` varchar(150) NOT NULL DEFAULT '0',
  `gutter` varchar(150) NOT NULL DEFAULT '0',
  `is_fit_width` varchar(150) NOT NULL DEFAULT 'true',
  `transition_duration` varchar(150) NOT NULL DEFAULT '0.4',
  `feature_image` varchar(150) NOT NULL DEFAULT '',
  PRIMARY KEY (`theme_id`)
) DEFAULT CHARSET=utf8;
