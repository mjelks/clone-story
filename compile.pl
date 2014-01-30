#!/usr/bin/perl -w

my $content = '';
my $infile = "source.js";
my $outfile = "bookmarklet.js";

open FILE, $infile or die "Couldn't open file"; 
$content = join '    ', <FILE>;
close FILE;

# thanks to: http://upshots.org/javascript/javascript-regexp-to-remove-comments
$content =~ s/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)//gm;

# wrap the necessary bookmarklet format for source js code
$content ="javascript:void(function () {\n" . $content . "\n}());\n";

open (OUTFILE, ">$outfile");
print OUTFILE $content;
close (OUTFILE);

print "Finished output. You can see the results at : $outfile\n";