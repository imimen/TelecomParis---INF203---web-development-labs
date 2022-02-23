// Question 2a
function wordCount(s){
    var results = {};
    var word ;
    var words = s.split(" ");
    for (var i=0; i< words.length; i++){
        word = words[i]
        if (!results[word]){
            results[word] = 1;
        }else{
            results[word]++;
        }
    }
    return results;
}

// Question 2b
function WordList(s){
    this.maxCountWord = function (){
        var words = wordCount(s);
        max_words = [];
        max = 0
        for (var i in words){
            if (words[i] > max){ max = words[i];}
        }
        for (var i in words){
            if (words[i]==max){ max_words.push(i);}
        }
        max_words.sort();
        return max_words[0];
    };

    this.minCountWord = function(){
        var words = wordCount(s);
        min_words = [];
        min = (s.split(" ")).length
        for (var i in words){
            if (words[i] < min){ min = words[i];}
        }
        for (var i in words){
            if (words[i]==min){ min_words.push(i);}
        }
        min_words.sort();
        return min_words[0];
    }

    this.getWords = function(){
        var words = wordCount(s);
        var words_sorted = [];
        for (var i in words){
            words_sorted.push(i);
        }
        words_sorted.sort();
        return words_sorted;
    };

    this.getCount = function(word){
        var words = wordCount(s);
        var count = words[word];
        if (count==null){ return 0;}
        else {return count};
    };

    this.applyWordFunc = function(f){
        var words = this.getWords();
        var results = [];
        for (var i=0; i< words.length; i++){
            results.push(f(words[i]));
        }
        return results;
    }
};

// Question 2c
var s = "aa aa bb a aa bbb bb aaa aa bb bb"
var obj = new WordList(s);
console.log(obj.maxCountWord());
console.log(obj.minCountWord());
console.log(obj.getWords());
console.log(obj.getCount('b'));
console.log(obj.getCount('bb'));
function f (word) {return word.length;}
console.log(obj.applyWordFunc(f));

exports.wordCount = wordCount;
exports.WordList = WordList;
