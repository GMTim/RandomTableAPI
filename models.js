/**
 * @namespace Models
 */

/**
 * @enum {string}
 */
const RangeTypes = {
    card: "card",
    pair: "pair",
    range: "range"
}

/**
 * @typedef {Object} Models.Range
 * @property {number} low - The lower boundary of the range.
 * @property {number} high - The upper boundary of the range.
 */

/**
 * @typedef {Object} Models.Pair
 * @property {Models.RangeInfo} first
 * @property {Models.RangeInfo} second
 */

/**
 * @typedef {Object} Models.RangeInfo
 * @property {RangeTypes} type
 * @property {Models.Range} range
 * @property {Models.Pair} pair
 */

/**
 * @typedef {Object} Models.TableEntry
 * @property {Models.Range} range - The range for this entry.
 * @property {string} value - The value associated with this entry.
 */

/**
 * @typedef {Object} Models.Table
 * @property {string} id - The unique identifier of the table.
 * @property {string} name - The name of the table.
 * @property {Models.RangeInfo} range
 * @property {Models.TableEntry[]} entries - An array of entries within the table.
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

export { RangeTypes }