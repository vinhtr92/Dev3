<?php
/**
 * @author JoomlaShine.com Team
 * @copyright JoomlaShine.com
 * @link joomlashine.com
 * @package JSN PowerAdmin support for com_content
 * @version $Id$
 * @license GNU/GPL v2 http://www.gnu.org/licenses/gpl-2.0.html
 */
defined('_JEXEC') or die('Restricted access');
jimport( 'joomla.plugin.plugin' );
include_once JPATH_ROOT . '/administrator/components/com_poweradmin/extensions/extensions.php';

class plgJsnpoweradminContact extends plgJsnpoweradminExtensions
{
	/**
	 * This event fired right after this plugin loaded
	 */
	public static function loadJavascriptLang()
	{
		$jsnLang = new JSNJavascriptLanguages();
		$jsnLang->addLang('JSN_RAWMODE_COMPONENT_EDIT_CONTACT');
		return $jsnLang->loadLang(false);
	}

	public static function getSupportedLanguages()
	{
		return;
	}

}