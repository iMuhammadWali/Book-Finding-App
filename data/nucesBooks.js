
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

  {
    volumeInfo: {
      title: "Model for writers",
      imageLinks: {
        thumbnail: "https://prod-cat-files.macmillan.cloud/MediaResources/Jackets/258W/9781319214722.jpg",
      },
      description: "This is the first semester English book taught at FAST-NUCES Lahore and I am adding this description for testing purposes since this is the first book i am adding in this FAST Books Repo.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://ia601003.us.archive.org/30/items/modelsforwritersshortessaysforcompositionpdfdrive.com/Models%20for%20Writers_%20Short%20Essays%20for%20Composition%20%28%20PDFDrive.com%20%29.pdf" 
  },
  {
    volumeInfo: {
      title: "Elementary Linear Algebra",
      imageLinks: {
        thumbnail: "https://m.media-amazon.com/images/I/61JRg8KIRqL._SY425_.jpg",
      },
      description: "This is the third semester Linear book taught at FAST-NUCES Lahore.",
      categories: [
        "First Semester"
      ]
    },
    downloadLink: "https://drive.google.com/file/d/1P9NqCEDALAavCs876RKnMi_Q7L3wBSa7/view?usp=sharing", 
    solutionLink: "https://drive.google.com/file/d/1dZ1ptQ36eGfVqYol8i4q0ubcXmqT48Sf/view?usp=sharing"
  },

];
export default NUCES_Books;