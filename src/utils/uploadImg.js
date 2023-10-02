async function uploadImg(img) {

        const formData = new FormData();

        formData.append('file', img);
        formData.append('upload_preset', 'wunldj1y');
    
        const response = await fetch('https://api.cloudinary.com/v1_1/dwq3ysahj/image/upload', {
          method: 'POST',
          body: formData
        });

        if(!response.ok) {
            throw new Error('Invalid image file!');
        }
    
        const data = await response.json();
    
        return data.url;   
}

export default uploadImg;