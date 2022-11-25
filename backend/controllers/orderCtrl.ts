import { SortOrder } from "mongoose";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { OrderModel } from "../models/orderModel";
import { CustomRequest } from "./../utils/customInterfaces";

export const orderCtrl = {
  adminGetOrders: async (req: Request, res: Response) => {
    try {
      const { page, limit, sort } = req.query;
      const limitQ = Number(limit) || 10;
      const pageQ = Number(page) - 1 || 0;
      const sortBy:
        | null
        | string
        | undefined
        | { [key: string]: SortOrder | { $meta: "textScore" } }
        | [string, SortOrder][] = {};

      if (sort === "earliest") {
        sortBy.createdAt = "desc";
      } else if (sort === "earliestUp") {
        sortBy.updatedAt = "desc";
      }
      const allOrders = await OrderModel.find()
        .populate("orderItems")
        .sort(sortBy)
        .skip(pageQ * limitQ)
        .limit(limitQ);
      res.status(200).json({ length: allOrders.length, msg: allOrders });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  createNewOrder: async (req: CustomRequest, res: Response) => {
    try {
      const { fullname, email, orderItems } = req.body;
      const userMail = email || req.user?.email;
      const newOrder = new OrderModel({
        user: req.user?._id,
        fullname,
        email: userMail,
        address: req.user?.address,
        orderItems,
      });
      await newOrder.save();
      await UserModel.findByIdAndUpdate(req.user?._id, {
        $push: { orders: newOrder._id },
      });
      res.status(200).json({ msg: newOrder });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  deleteOrder: async (req: Request, res: Response) => {
    try {
      await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Order deleted." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
  updateOrder: async (req: Request, res: Response) => {
    try {
      const { orderStatus } = req.body;
      await OrderModel.findByIdAndUpdate(req.params.id, { orderStatus });
      res.status(200).json({ msg: "Status changed." });
    } catch (error) {
      return res.status(500).json({ msg: (error as Error).message });
    }
  },
};
