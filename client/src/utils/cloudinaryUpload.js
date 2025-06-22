const cloud_url = 'https://api.cloudinary.com/v1_1/yt-cloud-01/auto/upload';

const uploadImage = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append("file", filePath);
    formData.append("upload_preset", "chat-aap-files");

    const response = await fetch(cloud_url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
      return { data: data.secure_url, success: true, message: "Profile Pic Updated" }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadImage;
