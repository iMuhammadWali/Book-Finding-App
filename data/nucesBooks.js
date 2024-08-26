
const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (e) {
    return false;
  }
};

const fetchBookCover = (book) => {
  book.cover = 0;
  const googleBooksThumbnail = book.volumeInfo?.imageLinks?.thumbnail;
  if (googleBooksThumbnail) {
    book.cover = googleBooksThumbnail;
    return;
  }
  book.cover = "/defaultCover.jpg";
};

const NUCES_Books = [
  //1
  {
    volumeInfo: {
      title: "Model for writers - 12th Edition",
      imageLinks: {
        thumbnail: "https://prod-cat-files.macmillan.cloud/MediaResources/Jackets/258W/9781319214722.jpg",
      },
      description: "This is the first semester English book taught at FAST-NUCES Lahore and I am adding this description for testing purposes since this is the first book i am adding in this FAST Books Repo.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/10d9IICRyUxZkDT0mvp8C7A-BaPmRlXLT/view" ,
    isNuces: true

  },
  //2
  {
    volumeInfo: {
      title: "Elementary Linear Algebra - 14th Edition",
      imageLinks: {
        thumbnail: "https://m.media-amazon.com/images/I/61JRg8KIRqL._SY425_.jpg",
      },
      description: "This is the third semester Linear book taught at FAST-NUCES Lahore.",
      categories: [
        "Third Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/1P9NqCEDALAavCs876RKnMi_Q7L3wBSa7/view?usp=sharing", 
    solutionLink: "https://drive.google.com/file/d/1dZ1ptQ36eGfVqYol8i4q0ubcXmqT48Sf/view?usp=sharing",
    isNuces: true
  },
  //2
  {
    volumeInfo: {
      title: "Elementary Linear Algebra - 14th Edition",
      imageLinks: {
        thumbnail: "https://m.media-amazon.com/images/I/61JRg8KIRqL._SY425_.jpg",
      },
      description: "This is the third semester Linear book taught at FAST-NUCES Lahore.",
      categories: [
        "Third Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/1P9NqCEDALAavCs876RKnMi_Q7L3wBSa7/view?usp=sharing", 
    solutionLink: "https://drive.google.com/file/d/1dZ1ptQ36eGfVqYol8i4q0ubcXmqT48Sf/view?usp=sharing",
    isNuces: true
  },
  //3
  {
    volumeInfo: {
      title: "Thomas Calculus - 14th Edition",
      imageLinks: {
        thumbnail: "https://cdn.numerade.com/books/9780134438986.jpg",
      },
      description: "This is the first semester book taught at FAST-NUCES Lahore for the course Calculus and Analytical Geometry and for the second semester course MultiVariable Calculus as well.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/10fRNRMM5IFa4sQmr3QJua8Z0uiFIdK-_/view?usp=drive_link", 
    solutionLink: "https://drive.google.com/file/d/10qeYnjtdn56EOo4A1jwGANTStHtkfuOf/view?usp=drive_link",
    isNuces: true
  },
  //4
  {
    volumeInfo: {
      title: "C++ How to program - Global Edition",
      imageLinks: {
        thumbnail: "https://deitel.com/wp-content/uploads/2020/01/c-plus-plus-how-to-program-10e.jpg",
      },
      description: "This is the first semester book taught at FAST-NUCES Lahore for the Programming Fundamentalas course.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/1m6R8rPdINWeoxmArneybliYGzinNVC0a/view?usp=sharing", 
    isNuces: true
  },
  //5
  {
    volumeInfo: {
      title: "Islamiat Notes - English",
      imageLinks: {
        thumbnail: "/defaultNucesCover.png",
      },
      description: "Notes of Islamiat course taught in the first semester at FAST-NUCES.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/17GepoinEGBWnBnr9M5CW2uL71eXeXY6D/view?usp=sharing", 
    isNuces: true
  },
  //6
  {
    volumeInfo: {
      title: "Applied Physics - 10th Edition",
      imageLinks: {
        thumbnail: "https://m.media-amazon.com/images/I/61PJzaghcSL._SX342_SY445_.jpg",
      },
      description: "Applied Physics Books taught in the first semester at FAST-NUCES with its solution manual.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/1i7UTEQHQR62BMYpcZ5weV9hesbdU2i51/view?usp=sharing", 
    solutionLink: "https://drive.google.com/file/d/1iR_TrWQHCP_gbmrGnW-4uqtc65jfoV9h/view?usp=sharing",
    isNuces: true
  },

];
export default NUCES_Books;