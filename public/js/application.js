let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dzld7l7dv/upload';
let CLOUDINARY_UPLOAD_PRESET = 'qdkkdnnh';
let imjPreview = document.getElementById('img-preview');
let fileUpload = document.getElementById('file-upload');

fileUpload.addEventListener('change', function(event) {
  let file = event.target.files[0];
  let formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then(function(res){
    // console.log(res);
    imjPreview.src = res.data.secure_url;
  }).catch(function(err){
    console.log(err);
  })
  // console.log(file);
});
