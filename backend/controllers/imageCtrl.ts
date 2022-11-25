import fs from "fs";
import cloudinary from "cloudinary";
import { Request, Response } from "express";

export const config = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};
const removeTemp = (path: string) => {
  fs.unlinkSync(path);
};

export const imageCtrl = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      const files: any = req.files?.images;
      if (!files) return res.status(400).json({ msg: "Please choose images" });
      const uploadingImgs = files.map((item: any) => {
        if (item.size > 1024 * 1024) {
          removeTemp((<any>item).tempFilePath);
          return {
            error: `${(<any>item).name}'s size is too large.`,
          };
        }
        return cloudinary.v2.uploader
          .upload((<any>item).tempFilePath, {
            ...config,
            folder: "Mepo_Af",
          })
          .then((result) => {
            removeTemp((<any>item).tempFilePath);
            return {
              url: result.secure_url,
              public_id: result.public_id,
            };
          });
      });
      Promise.all(uploadingImgs).then((images) => {
        res.status(200).json({ images });
      });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  deleteImage: async (req: Request, res: Response) => {
    try {
      const { public_id } = req.body;
      if (!public_id) return res.status(400).json({ msg: "No image selected" });
      await cloudinary.v2.api.delete_resources(public_id, config);
      res.status(200).json({ msg: "Deleted image" });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
};
