
const checkImageExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (e) {
      return false;
    }
  };

export const fetchBookCover =  (book) => {
    book.cover = 0;
    const googleBooksThumbnail = book.volumeInfo?.imageLinks?.thumbnail;
    if (googleBooksThumbnail) {
        book.cover = googleBooksThumbnail;
        return;
    }
    book.cover = "/defaultCover.jpg";
};