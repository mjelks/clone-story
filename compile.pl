#!/usr/bin/perl -w

# this is a quick and dirty wrapper function that strips comments from source code 
# and adds the javascript:void method need for the bookmarklet functionality
# bookmarklets DO NOT LIKE comments in js code

my $content = '';
my $infile = "source.js";
my $outfile = "bookmarklet.js";

open FILE, $infile or die "Couldn't open file"; 
$content = join '    ', <FILE>;
close FILE;

# remove console.log statements
$content =~ s/.*console\.log.*//g;

# thanks to: http://upshots.org/javascript/javascript-regexp-to-remove-comments
$content =~ s/(\/\*([\s\S]*?)\*\/)|(?<!['"])(\/\/(.*)$)//gm;


# wrap the necessary bookmarklet format for source js code
$content ="javascript:void(function () {\n" . $content . "\n}());\n";

open (OUTFILE, ">$outfile");
print OUTFILE $content;
close (OUTFILE);

print "Finished output. You can see the results at : $outfile\n";