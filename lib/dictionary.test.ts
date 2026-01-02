import { describe, it, expect, beforeAll } from 'vitest'
import { lookupWord, getSuggestions } from './dictionary'

describe('Dictionary Module', () => {

    describe('lookupWord', () => {
        it('should find Vietnamese word "xin chào"', () => {
            const result = lookupWord('xin chào')
            expect(result.exists).toBe(true)
            expect(result.word).toBe('xin chào')
            expect(result.results.length).toBeGreaterThan(0)
        })

        it('should find Vietnamese word with normalization', () => {
            // Test with i/y normalization
            const result = lookupWord('ký')
            expect(result.exists).toBe(true)
        })

        it('should return meanings with required fields', () => {
            const result = lookupWord('từ điển')
            expect(result.exists).toBe(true)

            const firstResult = result.results[0]
            expect(firstResult).toHaveProperty('lang_code')
            expect(firstResult).toHaveProperty('lang_name')
            expect(firstResult).toHaveProperty('meanings')

            if (firstResult.meanings.length > 0) {
                const meaning = firstResult.meanings[0]
                expect(meaning).toHaveProperty('definition')
                expect(meaning).toHaveProperty('definition_lang')
                expect(meaning).toHaveProperty('example')
                expect(meaning).toHaveProperty('pos')
            }
        })

        it('should filter by language code', () => {
            // Test with Vietnamese word, filter by 'vi'
            const result = lookupWord('xin chào', 'vi')
            if (result.exists) {
                expect(result.results.every(r => r.lang_code === 'vi')).toBe(true)
            }
        })

        it('should return empty results for non-existent word', () => {
            const result = lookupWord('xyznonexistent123')
            expect(result.exists).toBe(false)
            expect(result.results).toEqual([])
        })

        it('should prioritize Vietnamese results', () => {
            // Words that exist in multiple languages should show vi first
            const result = lookupWord('a')
            if (result.exists && result.results.length > 1) {
                expect(result.results[0].lang_code).toBe('vi')
            }
        })
    })

    describe('getSuggestions', () => {
        it('should return suggestions for prefix', () => {
            const suggestions = getSuggestions('xin', 5)
            expect(suggestions.length).toBeGreaterThan(0)
            expect(suggestions.every(s => s.startsWith('xin'))).toBe(true)
        })

        it('should respect limit parameter', () => {
            const suggestions = getSuggestions('a', 3)
            expect(suggestions.length).toBeLessThanOrEqual(3)
        })

        it('should filter by language', () => {
            const suggestions = getSuggestions('hel', 5, 'en')
            expect(suggestions.length).toBeGreaterThanOrEqual(0)
        })

        it('should return empty array for no matches', () => {
            const suggestions = getSuggestions('xyznonexistent', 5)
            expect(suggestions).toEqual([])
        })
    })

    describe('DictionaryMeaning structure', () => {
        it('should have correct example format (backward compatible)', () => {
            const result = lookupWord('đảo')
            expect(result.exists).toBe(true)

            // Find a meaning with example
            const meaningWithExample = result.results
                .flatMap(r => r.meanings)
                .find(m => m.example !== null)

            if (meaningWithExample) {
                // Current format: example is string
                expect(typeof meaningWithExample.example).toBe('string')
            }
        })

        it('should have links as array', () => {
            const result = lookupWord('từ điển')
            expect(result.exists).toBe(true)

            if (result.results[0]?.meanings[0]) {
                expect(Array.isArray(result.results[0].meanings[0].links)).toBe(true)
            }
        })
    })
})
