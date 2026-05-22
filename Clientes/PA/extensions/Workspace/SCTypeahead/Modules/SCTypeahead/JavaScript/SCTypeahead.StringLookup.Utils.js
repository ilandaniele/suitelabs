define('SCTypeahead.StringLookup.Utils', [
    'Backbone',
    'SC.Configuration',
    'Utils',
    'underscore'
], function(
    Backbone,
    Configuration,
    Utils,
    _
) {
    'use strict';

    var StringLooupUtilities = {

        getSimilarityScore: function getSimilarityScore(s, t) 
        {
            //refereced from https://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript?noredirect=1&lq=1
            
            var d = []; //2d matrix

            // Step 1
            var n = s.length;
            var m = t.length;

            if (n == 0) return m;
            if (m == 0) return n;

            //Create an array of arrays in javascript (a descending loop is quicker)
            for (var i = n; i >= 0; i--) d[i] = [];

            // Step 2
            for (var i = n; i >= 0; i--) d[i][0] = i;
            for (var j = m; j >= 0; j--) d[0][j] = j;

            // Step 3
            for (var i = 1; i <= n; i++) {
                var s_i = s.charAt(i - 1);

                // Step 4
                for (var j = 1; j <= m; j++) {

                    //Check the jagged ld total so far
                    if (i == j && d[i][j] > 4) return n;

                    var t_j = t.charAt(j - 1);
                    var cost = (s_i == t_j) ? 0 : 1; // Step 5

                    //Calculate the minimum
                    var mi = d[i - 1][j] + 1;
                    var b = d[i][j - 1] + 1;
                    var c = d[i - 1][j - 1] + cost;

                    if (b < mi) mi = b;
                    if (c < mi) mi = c;

                    d[i][j] = mi; // Step 6

                    //Damerau transposition
                    if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
                    }
                }
            }

            // Step 7
            return d[n][m];
        },
        
        getStringCompareScore: function getStringCompareScore(first, second) 
        {
            first = first.replace(/\s+/g, '');
            second = second.replace(/\s+/g, '');
        
            //if (!first.length && !second.length) return 1;                   
            //if (!first.length || !second.length) return 0;                   
            //if (first === second) return 1;       							 
            //if (first.length === 1 && second.length === 1) return 0;         
            //if (first.length < 2 || second.length < 2) return 0;			 
        
            var firstBigrams = new Map();
            for (var i = 0; i < first.length - 1; i++) 
            {
                var bigram = first.substring(i, i + 2);
                var count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram) + 1
                    : 1;
        
                firstBigrams.set(bigram, count);
            };

            var intersectionSize = 0;
            for (var i = 0; i < second.length - 1; i++) 
            {
                var bigram = second.substring(i, i + 2);
                var count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram)
                    : 0;
        
                if (count > 0)
                {
                    firstBigrams.set(bigram, count - 1);
                    intersectionSize++;
                }
            }
        
            //return (2.0 * intersectionSize) / (first.length + second.length - 2);

            return intersectionSize; //number of common characters
        }

    };
    return StringLooupUtilities;
});
