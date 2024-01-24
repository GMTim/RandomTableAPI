/**
 * @namespace Models
 */

/**
 * @typedef {Object} Models.Range
 * @property {number} low - The lower boundary of the range.
 * @property {number} high - The upper boundary of the range.
 */

/**
 * @typedef {Object} Models.TableEntry
 * @property {Range} range - The range for this entry.
 * @property {string} value - The value associated with this entry.
 */

/**
 * @typedef {Object} Models.Table
 * @property {string} id - The unique identifier of the table.
 * @property {string} name - The name of the table.
 * @property {Range} range - The overall range of the table.
 * @property {TableEntry[]} entries - An array of entries within the table.
 */

/**
 * @typedef {Object} Models.TableListEntry
 * @property {string} id - The unique identifier of the table.
 * @property {string} name - The name of the table.
 */

/**
 * @typedef {Object} Models.GameInfo
 * @property {string} id - The unique identifier of the game.
 * @property {string} name - The name of the game.
 */