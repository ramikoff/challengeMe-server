import User from "../models/User.js";

export const uploadProfileImage = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file || !req.file.secure_url) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Determine user ID
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided",
      });
    }

    // Find and update user with new profile picture URL
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profilePictureUrl: req.file.secure_url,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators
      }
    );

    // Check if user was found and updated
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with success and updated user
    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: {
        _id: user._id,
        profilePictureUrl: user.profilePictureUrl,
      },
    });
  } catch (err) {
    console.error("Profile image upload error:", err);
    res.status(500).json({
      success: false,
      message: "Error uploading profile image",
      error: err.message,
    });
  }
};
