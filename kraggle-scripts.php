<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://kragglesites.com
 * @since             
 * @package           Kraggle-Scripts
 *
 * @wordpress-plugin
 * Plugin Name:       Kraggles Scripts
 * Plugin URI:        http://kragglesites.com
 * Description:       Injects some javascript that makes page layout a but easier. Hides the Wordpress bar. Ensures the footer is always at the bottom of the page.
 * Version:           1.0.2
 * Author:            Kraggle
 * Author URI:        http://kragglesites.com/
 * License:           GPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       kraggle-scripts
 * Domain Path:       /
 */

$version = '1.0.2';

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

define('KS_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('KS_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('KS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', function () {
	global $version;

	wp_enqueue_script('module-ks', KS_PLUGIN_URL . 'js/script.js', ['jquery'], $version);
}, 100);

function ks_script_as_module($tag, $handle, $src) {
	if (preg_match('/^module-/', $handle)) {
		$tag = '<script type="module" src="' . esc_url($src) . '" id="' . $handle . '"></script>';
	}

	return $tag;
}
add_filter('script_loader_tag', 'ks_script_as_module', 10, 3);
