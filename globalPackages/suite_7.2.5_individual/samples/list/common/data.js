const data = [
	{
		value: "J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings",
		authors: "J.R.R. Tolkien",
		average_rating: 4.59,
		publication_date: "9/25/2012",
		in_store: true,
		isbn13: 9780345538376,
		language_code: "eng",
		num_pages: 1728,
		ratings_count: 101233,
		text_reviews_count: 1550,
		publisher: "Ballantine Books",
	},
	{
		value: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
		authors: "J.K. Rowling/Mary GrandPré",
		average_rating: 4.57,
		publication_date: "9/16/2006",
		in_store: true,
		isbn13: 9780439785969,
		language_code: "eng",
		num_pages: 652,
		ratings_count: 2095690,
		text_reviews_count: 27591,
		publisher: "Scholastic Inc.",
	},
	{
		value: "Harry Potter and the Prisoner of Azkaban (Harry Potter  #3)",
		authors: "J.K. Rowling/Mary GrandPré",
		average_rating: 4.56,
		publication_date: "5/1/2004",
		in_store: true,
		isbn13: 9780439655484,
		language_code: "eng",
		num_pages: 435,
		ratings_count: 2339585,
		text_reviews_count: 36325,
		publisher: "Scholastic Inc.",
	},
	{
		value: "The Complete Maus",
		authors: "Art Spiegelman",
		average_rating: 4.55,
		publication_date: "10/2/2003",
		in_store: true,
		isbn13: 9780141014081,
		language_code: "eng",
		num_pages: 296,
		ratings_count: 111475,
		text_reviews_count: 5966,
		publisher: "Penguin Books",
	},
	{
		value: "Fullmetal Alchemist  Vol. 1 (Fullmetal Alchemist  #1)",
		authors: "Hiromu Arakawa/Akira Watanabe",
		average_rating: 4.5,
		publication_date: "5/3/2005",
		in_store: true,
		isbn13: 9781591169208,
		language_code: "eng",
		num_pages: 192,
		ratings_count: 111091,
		text_reviews_count: 1427,
		publisher: "VIZ Media LLC",
	},
	{
		value: "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
		authors: "J.K. Rowling/Mary GrandPré",
		average_rating: 4.49,
		publication_date: "9/1/2004",
		in_store: true,
		isbn13: 9780439358071,
		language_code: "eng",
		num_pages: 870,
		ratings_count: 2153167,
		text_reviews_count: 29221,
		publisher: "Scholastic Inc.",
	},
	{
		value: "Lover Awakened (Black Dagger Brotherhood  #3)",
		authors: "J.R. Ward",
		average_rating: 4.45,
		publication_date: "9/5/2006",
		in_store: true,
		isbn13: 9780451219367,
		language_code: "eng",
		num_pages: 448,
		ratings_count: 144906,
		text_reviews_count: 5728,
		publisher: "Signet",
	},
	{
		value: "The Two Towers (The Lord of the Rings  #2)",
		authors: "J.R.R. Tolkien/Peter S. Beagle",
		average_rating: 4.44,
		publication_date: "9/5/2003",
		in_store: true,
		isbn13: 9780618346264,
		language_code: "eng",
		num_pages: 322,
		ratings_count: 593467,
		text_reviews_count: 5798,
		publisher: "Houghton Mifflin",
	},
	{
		value: "The Green Mile",
		authors: "Stephen King",
		average_rating: 4.44,
		publication_date: "9/1/1996",
		in_store: true,
		isbn13: 9780451933027,
		language_code: "eng",
		num_pages: 592,
		ratings_count: 207869,
		text_reviews_count: 4570,
		publisher: "Penguin Signet",
	},
	{
		value: "The Monster at the End of this Book",
		authors: "Jon Stone/Michael J. Smollin",
		average_rating: 4.44,
		publication_date: "5/11/2004",
		in_store: true,
		isbn13: 9780375829130,
		language_code: "eng",
		num_pages: 32,
		ratings_count: 114297,
		text_reviews_count: 2565,
		publisher: "Golden Books",
	},
	{
		value: "A Breath of Snow and Ashes (Outlander  #6)",
		authors: "Diana Gabaldon",
		average_rating: 4.44,
		publication_date: "8/29/2006",
		in_store: false,
		isbn13: 9780385340397,
		language_code: "eng",
		num_pages: 980,
		ratings_count: 105950,
		text_reviews_count: 3992,
		publisher: "Delta",
	},
	{
		value: "Death Note  Vol. 1: Boredom (Death Note  #1)",
		authors: "Tsugumi Ohba/Takeshi Obata/Pookie Rolf",
		average_rating: 4.43,
		publication_date: "10/10/2005",
		in_store: false,
		isbn13: 9781421501680,
		language_code: "eng",
		num_pages: 195,
		ratings_count: 174482,
		text_reviews_count: 3010,
		publisher: "VIZ Media LLC",
	},
	{
		value: "The Complete Anne of Green Gables Boxed Set (Anne of Green Gables  #1-8)",
		authors: "L.M. Montgomery",
		average_rating: 4.43,
		publication_date: "10/6/1998",
		in_store: true,
		isbn13: 76783609419,
		language_code: "eng",
		num_pages: 2088,
		ratings_count: 98611,
		text_reviews_count: 1447,
		publisher: "Starfire",
	},
	{
		value: "Dead Beat (The Dresden Files  #7)",
		authors: "Jim Butcher",
		average_rating: 4.43,
		publication_date: "1/1/2006",
		in_store: true,
		isbn13: 9780451460912,
		language_code: "eng",
		num_pages: 517,
		ratings_count: 91592,
		text_reviews_count: 2747,
		publisher: "Roc",
	},
	{
		value:
			"Band of Brothers: E Company  506th Regiment  101st Airborne from Normandy to Hitler's Eagle's Nest",
		authors: "Stephen E. Ambrose",
		average_rating: 4.43,
		publication_date: "9/1/2002",
		in_store: true,
		isbn13: 9780743464116,
		language_code: "eng",
		num_pages: 432,
		ratings_count: 82525,
		text_reviews_count: 2124,
		publisher: "Simon & Schuster; Media Tie-In edition",
	},
	{
		value: "Harry Potter and the Chamber of Secrets (Harry Potter  #2)",
		authors: "J.K. Rowling/Mary GrandPré",
		average_rating: 4.42,
		publication_date: "6/2/1999",
		in_store: true,
		isbn13: 9780439064866,
		language_code: "eng",
		num_pages: 341,
		ratings_count: 2293963,
		text_reviews_count: 34692,
		publisher: "Arthur A. Levine Books / Scholastic Inc.",
	},
	{
		value: "A Clash of Kings  (A Song of Ice and Fire  #2)",
		authors: "George R.R. Martin",
		average_rating: 4.41,
		publication_date: "5/28/2002",
		in_store: true,
		isbn13: 9780553381696,
		language_code: "eng",
		num_pages: 969,
		ratings_count: 638766,
		text_reviews_count: 16535,
		publisher: "Bantam",
	},
	{
		value: "Voyager (Outlander  #3)",
		authors: "Diana Gabaldon",
		average_rating: 4.39,
		publication_date: "8/7/2001",
		in_store: true,
		isbn13: 9780385335997,
		language_code: "eng",
		num_pages: 870,
		ratings_count: 198818,
		text_reviews_count: 8130,
		publisher: "Delta",
	},
	{
		value: "The Ultimate Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1-5)",
		authors: "Douglas Adams",
		average_rating: 4.38,
		publication_date: "4/30/2002",
		in_store: true,
		isbn13: 9780345453747,
		language_code: "eng",
		num_pages: 815,
		ratings_count: 249558,
		text_reviews_count: 4080,
		publisher: "Del Rey Books",
	},
	{
		value: "The Complete Stories and Poems",
		authors: "Edgar Allan Poe",
		average_rating: 4.38,
		publication_date: "8/15/1984",
		in_store: false,
		isbn13: 9780385074070,
		language_code: "eng",
		num_pages: 821,
		ratings_count: 183869,
		text_reviews_count: 1226,
		publisher: "Doubleday & Company  Inc.",
	},
	{
		value: "The Book Thief",
		authors: "Markus Zusak/Cao Xuân Việt Khương",
		average_rating: 4.37,
		publication_date: "3/14/2006",
		in_store: true,
		isbn13: 9780375831003,
		language_code: "eng",
		num_pages: 552,
		ratings_count: 1516367,
		text_reviews_count: 86881,
		publisher: "Alfred A. Knopf",
	},
	{
		value: "The Fellowship of the Ring (The Lord of the Rings  #1)",
		authors: "J.R.R. Tolkien",
		average_rating: 4.36,
		publication_date: "9/5/2003",
		in_store: true,
		isbn13: 9780618346257,
		language_code: "eng",
		num_pages: 398,
		ratings_count: 2128944,
		text_reviews_count: 13670,
		publisher: "Houghton Mifflin Harcourt",
	},
	{
		value: "Man's Search for Meaning",
		authors: "Viktor E. Frankl/Harold S. Kushner/William J. Winslade/Isle Lasch",
		average_rating: 4.36,
		publication_date: "6/1/2006",
		in_store: true,
		isbn13: 9780807014295,
		language_code: "eng",
		num_pages: 165,
		ratings_count: 282127,
		text_reviews_count: 13449,
		publisher: "Beacon Press",
	},
	{
		value: "A Fine Balance",
		authors: "Rohinton Mistry",
		average_rating: 4.36,
		publication_date: "11/30/2001",
		in_store: true,
		isbn13: 9781400030651,
		language_code: "eng",
		num_pages: 603,
		ratings_count: 112196,
		text_reviews_count: 7546,
		publisher: "Vintage",
	},
	{
		value: "The Lorax",
		authors: "Dr. Seuss",
		average_rating: 4.35,
		publication_date: "2/24/1998",
		in_store: true,
		isbn13: 9780679889106,
		language_code: "eng",
		num_pages: 72,
		ratings_count: 260054,
		text_reviews_count: 3532,
		publisher: "Random House Books for Young Readers",
	},
	{
		value: "Lover Eternal (Black Dagger Brotherhood  #2)",
		authors: "J.R. Ward",
		average_rating: 4.35,
		publication_date: "3/7/2006",
		in_store: true,
		isbn13: 9780451218049,
		language_code: "eng",
		num_pages: 464,
		ratings_count: 155348,
		text_reviews_count: 5325,
		publisher: "Signet",
	},
	{
		value: "Drums of Autumn (Outlander  #4)",
		authors: "Diana Gabaldon",
		average_rating: 4.35,
		publication_date: "8/7/2001",
		in_store: true,
		isbn13: 9780385335980,
		language_code: "eng",
		num_pages: 880,
		ratings_count: 141771,
		text_reviews_count: 5455,
		publisher: "Delta",
	},
	{
		value: "Different Seasons",
		authors: "Stephen King",
		average_rating: 4.35,
		publication_date: "2/16/1995",
		in_store: true,
		isbn13: 9780751514629,
		language_code: "eng",
		num_pages: 560,
		ratings_count: 127648,
		text_reviews_count: 2080,
		publisher: "Warner Books",
	},
	{
		value: "The Power of One (The Power of One  #1)",
		authors: "Bryce Courtenay",
		average_rating: 4.35,
		publication_date: "9/29/1996",
		in_store: true,
		isbn13: 9780345410054,
		language_code: "eng",
		num_pages: 544,
		ratings_count: 69167,
		text_reviews_count: 4551,
		publisher: "Ballantine Books",
	},
	{
		value: "A Light in the Attic",
		authors: "Shel Silverstein",
		average_rating: 4.34,
		publication_date: "10/7/2002",
		in_store: true,
		isbn13: 9780060513061,
		language_code: "eng",
		num_pages: 176,
		ratings_count: 349247,
		text_reviews_count: 2567,
		publisher: "Harpercollins Childrens Books",
	},
	{
		value: "Maus I: A Survivor's Tale: My Father Bleeds History (Maus  #1)",
		authors: "Art Spiegelman",
		average_rating: 4.34,
		publication_date: "11/1/1991",
		in_store: true,
		isbn13: 9780394541556,
		language_code: "eng",
		num_pages: 159,
		ratings_count: 203013,
		text_reviews_count: 4873,
		publisher: "Pantheon Books",
	},
	{
		value: "Exodus",
		authors: "Leon Uris",
		average_rating: 4.34,
		publication_date: "10/1/1986",
		in_store: true,
		isbn13: 9780553258479,
		language_code: "eng",
		num_pages: 608,
		ratings_count: 85927,
		text_reviews_count: 1520,
		publisher: "Bantam Books  Inc.",
	},
	{
		value: "Mere Christianity",
		authors: "C.S. Lewis",
		average_rating: 4.32,
		publication_date: "6/1/1996",
		in_store: true,
		isbn13: 9780684823782,
		language_code: "eng",
		num_pages: 191,
		ratings_count: 240060,
		text_reviews_count: 5828,
		publisher: "Touchstone Books",
	},
	{
		value: "Dragonfly in Amber (Outlander  #2)",
		authors: "Diana Gabaldon",
		average_rating: 4.32,
		publication_date: "8/7/2001",
		in_store: false,
		isbn13: 9780385335973,
		language_code: "eng",
		num_pages: 743,
		ratings_count: 222140,
		text_reviews_count: 11121,
		publisher: "Bantam",
	},
	{
		value: "The Brothers Karamazov",
		authors: "Fyodor Dostoyevsky/Fyodor Dostoevsky/Richard Pevear/Larissa Volokhonsky",
		average_rating: 4.32,
		publication_date: "6/14/2002",
		in_store: true,
		isbn13: 9780374528379,
		language_code: "eng",
		num_pages: 796,
		ratings_count: 191531,
		text_reviews_count: 6795,
		publisher: "Farrar  Straus and Giroux",
	},
	{
		value: "Half of a Yellow Sun",
		authors: "Chimamanda Ngozi Adichie",
		average_rating: 4.32,
		publication_date: "9/12/2006",
		in_store: true,
		isbn13: 9781400044160,
		language_code: "eng",
		num_pages: 433,
		ratings_count: 71280,
		text_reviews_count: 5494,
		publisher: "Knopf",
	},
	{
		value: "Matilda",
		authors: "Roald Dahl/Quentin Blake",
		average_rating: 4.31,
		publication_date: "6/1/1998",
		in_store: true,
		isbn13: 9780141301068,
		language_code: "eng",
		num_pages: 240,
		ratings_count: 541914,
		text_reviews_count: 11576,
		publisher: "Puffin Books",
	},
	{
		value: "Ender's Shadow (The Shadow Series  #1)",
		authors: "Orson Scott Card",
		average_rating: 4.31,
		publication_date: "5/19/2002",
		in_store: true,
		isbn13: 9780765342409,
		language_code: "eng",
		num_pages: 469,
		ratings_count: 133114,
		text_reviews_count: 4243,
		publisher: "Starscape",
	},
	{
		value: "Lover Revealed (Black Dagger Brotherhood  #4)",
		authors: "J.R. Ward",
		average_rating: 4.3,
		publication_date: "3/6/2007",
		in_store: true,
		isbn13: 9780451412355,
		language_code: "eng",
		num_pages: 480,
		ratings_count: 106469,
		text_reviews_count: 3691,
		publisher: "Onyx",
	},
	{
		value: "Gone with the Wind",
		authors: "Margaret Mitchell",
		average_rating: 4.29,
		publication_date: "4/1/1999",
		in_store: false,
		isbn13: 9780446675536,
		language_code: "eng",
		num_pages: 1037,
		ratings_count: 999139,
		text_reviews_count: 15323,
		publisher: "Warner Books",
	},
	{
		value: "Howl's Moving Castle (Howl's Moving Castle  #1)",
		authors: "Diana Wynne Jones",
		average_rating: 4.29,
		publication_date: "8/1/2001",
		in_store: true,
		isbn13: 9780064410342,
		language_code: "eng",
		num_pages: 329,
		ratings_count: 161582,
		text_reviews_count: 9026,
		publisher: "Harper Trophy",
	},
	{
		value: "Small Gods (Discworld  #13)",
		authors: "Terry Pratchett",
		average_rating: 4.29,
		publication_date: "8/1/2005",
		in_store: true,
		isbn13: 9780552152976,
		language_code: "eng",
		num_pages: 400,
		ratings_count: 83353,
		text_reviews_count: 1758,
		publisher: "Corgi",
	},
	{
		value: "Goodnight Moon",
		authors: "Margaret Wise Brown/Clement Hurd",
		average_rating: 4.28,
		publication_date: "1/23/2007",
		in_store: true,
		isbn13: 9780060775858,
		language_code: "eng",
		num_pages: 32,
		ratings_count: 276426,
		text_reviews_count: 4975,
		publisher: "HarperCollins",
	},
	{
		value: "Animal Farm / 1984",
		authors: "George Orwell/Christopher Hitchens",
		average_rating: 4.28,
		publication_date: "6/1/2003",
		in_store: true,
		isbn13: 9780151010264,
		language_code: "eng",
		num_pages: 400,
		ratings_count: 146659,
		text_reviews_count: 1625,
		publisher: "Houghton Mifflin Harcourt",
	},
	{
		value: "Team of Rivals: The Political Genius of Abraham Lincoln",
		authors: "Doris Kearns Goodwin",
		average_rating: 4.28,
		publication_date: "9/26/2006",
		in_store: true,
		isbn13: 9780743270755,
		language_code: "eng",
		num_pages: 916,
		ratings_count: 133840,
		text_reviews_count: 6118,
		publisher: "Simon & Schuster",
	},
	{
		value: "Surely You're Joking  Mr. Feynman!: Adventures of a Curious Character",
		authors: "Richard P. Feynman",
		average_rating: 4.28,
		publication_date: "4/12/1997",
		in_store: true,
		isbn13: 9780393316049,
		language_code: "eng",
		num_pages: 391,
		ratings_count: 106526,
		text_reviews_count: 3685,
		publisher: "W. W. Norton & Company",
	},
	{
		value: "The Great Divorce",
		authors: "C.S. Lewis",
		average_rating: 4.28,
		publication_date: "2/1/2002",
		in_store: true,
		isbn13: 9790007672386,
		language_code: "eng",
		num_pages: 160,
		ratings_count: 87527,
		text_reviews_count: 3867,
		publisher: "HarperCollins",
	},
	{
		value: "Lioness Rampant (Song of the Lioness  #4)",
		authors: "Tamora Pierce",
		average_rating: 4.28,
		publication_date: "1/1/2005",
		in_store: true,
		isbn13: 9780689878572,
		language_code: "en-US",
		num_pages: 384,
		ratings_count: 72386,
		text_reviews_count: 1230,
		publisher: "Simon Pulse",
	},
	{
		value: "The Hobbit  or There and Back Again",
		authors: "J.R.R. Tolkien",
		average_rating: 4.27,
		publication_date: "8/15/2002",
		in_store: true,
		isbn13: 9780618260300,
		language_code: "eng",
		num_pages: 366,
		ratings_count: 2530894,
		text_reviews_count: 32871,
		publisher: "Houghton Mifflin",
	},
	{
		value: "The Glass Castle",
		authors: "Jeannette Walls",
		average_rating: 4.27,
		publication_date: "1/17/2006",
		in_store: true,
		isbn13: 9780743247542,
		language_code: "eng",
		num_pages: 288,
		ratings_count: 808656,
		text_reviews_count: 46176,
		publisher: "Scribner",
	},
	{
		value: "The Fiery Cross (Outlander  #5)",
		authors: "Diana Gabaldon/Janos Farkas",
		average_rating: 4.27,
		publication_date: "8/30/2005",
		in_store: true,
		isbn13: 9780440221661,
		language_code: "eng",
		num_pages: 1443,
		ratings_count: 128901,
		text_reviews_count: 5294,
		publisher: "Dell",
	},
	{
		value: "The Princess Bride",
		authors: "William Goldman",
		average_rating: 4.26,
		publication_date: "7/15/2003",
		in_store: true,
		isbn13: 9780345418265,
		language_code: "eng",
		num_pages: 456,
		ratings_count: 703676,
		text_reviews_count: 13878,
		publisher: "Ballantine Books",
	},
	{
		value: "And Then There Were None",
		authors: "Agatha Christie",
		average_rating: 4.26,
		publication_date: "5/3/2004",
		in_store: true,
		isbn13: 9780312330873,
		language_code: "eng",
		num_pages: 264,
		ratings_count: 625767,
		text_reviews_count: 18785,
		publisher: "St. Martin's Press",
	},
	{
		value: "A Tree Grows in Brooklyn",
		authors: "Betty  Smith",
		average_rating: 4.26,
		publication_date: "5/30/2006",
		in_store: false,
		isbn13: 9780061120077,
		language_code: "eng",
		num_pages: 496,
		ratings_count: 345283,
		text_reviews_count: 16114,
		publisher: "HarperCollins Publishers",
	},
	{
		value: "Second Foundation (Foundation #3)",
		authors: "Isaac Asimov",
		average_rating: 4.26,
		publication_date: "6/1/2004",
		in_store: true,
		isbn13: 9780553803730,
		language_code: "eng",
		num_pages: 256,
		ratings_count: 119224,
		text_reviews_count: 1708,
		publisher: "Bantam Spectra",
	},
	{
		value: "Alanna: The First Adventure (Song of the Lioness  #1)",
		authors: "Tamora Pierce",
		average_rating: 4.26,
		publication_date: "1/1/2005",
		in_store: true,
		isbn13: 9780689878558,
		language_code: "eng",
		num_pages: 274,
		ratings_count: 101059,
		text_reviews_count: 3815,
		publisher: "Simon Pulse",
	},
	{
		value: "Moneyball: The Art of Winning an Unfair Game",
		authors: "Michael   Lewis",
		average_rating: 4.26,
		publication_date: "3/17/2004",
		in_store: true,
		isbn13: 9780393324815,
		language_code: "eng",
		num_pages: 317,
		ratings_count: 85094,
		text_reviews_count: 4155,
		publisher: "W. W. Norton  Company",
	},
	{
		value: "The Richest Man in Babylon",
		authors: "George S. Clason",
		average_rating: 4.26,
		publication_date: "2/1/2008",
		in_store: true,
		isbn13: 9780451205360,
		language_code: "eng",
		num_pages: 194,
		ratings_count: 76451,
		text_reviews_count: 3400,
		publisher: "Berkley Books",
	},
	{
		value: "Wild Swans: Three Daughters of China",
		authors: "Jung Chang",
		average_rating: 4.26,
		publication_date: "8/12/2003",
		in_store: true,
		isbn13: 9780743246989,
		language_code: "eng",
		num_pages: 562,
		ratings_count: 73572,
		text_reviews_count: 4280,
		publisher: "Simon  Schuster",
	},
	{
		value: "The Lightning Thief (Percy Jackson and the Olympians  #1)",
		authors: "Rick Riordan",
		average_rating: 4.25,
		publication_date: "3/1/2006",
		in_store: true,
		isbn13: 9780786838653,
		language_code: "eng",
		num_pages: 375,
		ratings_count: 1766725,
		text_reviews_count: 47951,
		publisher: "Disney Hyperion Books",
	},
	{
		value: "The Count of Monte Cristo",
		authors: "Alexandre Dumas/Robin Buss",
		average_rating: 4.25,
		publication_date: "5/27/2003",
		in_store: true,
		isbn13: 9780140449266,
		language_code: "eng",
		num_pages: 1276,
		ratings_count: 647271,
		text_reviews_count: 14249,
		publisher: "Penguin Classics",
	},
	{
		value: "Anne of Green Gables (Anne of Green Gables  #1)",
		authors: "L.M. Montgomery",
		average_rating: 4.25,
		publication_date: "5/6/2003",
		in_store: true,
		isbn13: 9780451528827,
		language_code: "eng",
		num_pages: 320,
		ratings_count: 625759,
		text_reviews_count: 13883,
		publisher: "Signet Book",
	},
	{
		value: "V for Vendetta",
		authors: "Alan Moore/David   Lloyd",
		average_rating: 4.25,
		publication_date: "11/1/2005",
		in_store: true,
		isbn13: 9781401207922,
		language_code: "eng",
		num_pages: 296,
		ratings_count: 234954,
		text_reviews_count: 4058,
		publisher: "Vertigo",
	},
	{
		value: "The Dragon Reborn (The Wheel of Time  #3)",
		authors: "Robert Jordan",
		average_rating: 4.25,
		publication_date: "9/14/2002",
		in_store: true,
		isbn13: 9780765305114,
		language_code: "eng",
		num_pages: 624,
		ratings_count: 183950,
		text_reviews_count: 2671,
		publisher: "Tor Books",
	},
	{
		value: "Persepolis: The Story of a Childhood (Persepolis  #1)",
		authors: "Marjane Satrapi/Mattias Ripa",
		average_rating: 4.25,
		publication_date: "6/1/2004",
		in_store: true,
		isbn13: 9780375714573,
		language_code: "eng",
		num_pages: 153,
		ratings_count: 144121,
		text_reviews_count: 8131,
		publisher: "Pantheon",
	},
	{
		value: "Lamb: The Gospel According to Biff  Christ's Childhood Pal",
		authors: "Christopher Moore",
		average_rating: 4.25,
		publication_date: "5/25/2004",
		in_store: false,
		isbn13: 9780380813810,
		language_code: "eng",
		num_pages: 444,
		ratings_count: 135109,
		text_reviews_count: 10380,
		publisher: "William Morrow / HarperCollins / Harper Perennial",
	},
	{
		value: "Cryptonomicon",
		authors: "Neal Stephenson",
		average_rating: 4.25,
		publication_date: "11/1/2002",
		in_store: true,
		isbn13: 9780060512804,
		language_code: "eng",
		num_pages: 1139,
		ratings_count: 83184,
		text_reviews_count: 4249,
		publisher: "Avon",
	},
	{
		value: "Shakespeare's Sonnets",
		authors: "William Shakespeare/Katherine Duncan-Jones",
		average_rating: 4.25,
		publication_date: "8/21/1997",
		in_store: true,
		isbn13: 9781903436578,
		language_code: "eng",
		num_pages: 488,
		ratings_count: 70617,
		text_reviews_count: 614,
		publisher: "Bloomsbury Academic",
	},
	{
		value: "The Sea of Monsters (Percy Jackson and the Olympians  #2)",
		authors: "Rick Riordan",
		average_rating: 4.24,
		publication_date: "4/1/2006",
		in_store: true,
		isbn13: 9780786856862,
		language_code: "eng",
		num_pages: 279,
		ratings_count: 630511,
		text_reviews_count: 19806,
		publisher: "Hyperion Books",
	},
	{
		value: "The Prince of Tides",
		authors: "Pat Conroy",
		average_rating: 4.24,
		publication_date: "3/26/2002",
		in_store: true,
		isbn13: 9780553381542,
		language_code: "eng",
		num_pages: 679,
		ratings_count: 178717,
		text_reviews_count: 3473,
		publisher: "Hyperion Books",
	},
];
