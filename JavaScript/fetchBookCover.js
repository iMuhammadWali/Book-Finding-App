
const checkImageExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (e) {
      return false;
    }
  };

export const fetchBookCover = async (book) => {
    book.cover = 0;
    // const isbn = book.volumeInfo.industryIdentifiers
    //     ? book.volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier : null;

        
    // if (isbn) {
    //     const openLibraryUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
    //     const exists = await checkImageExists(openLibraryUrl);
    //     if (exists) {
    //         book.cover = openLibraryUrl;
    //         return;
    //     }
    // }
    const googleBooksThumbnail = book.volumeInfo?.imageLinks?.thumbnail;
    if (googleBooksThumbnail) {
        book.cover = googleBooksThumbnail;
        return;
    }
    // book.cover=googleBooksThumbnail;
    book.cover = "/defaultCover.jpg";
};
