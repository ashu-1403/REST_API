import Page from "../models/page.js";
import User from "../models/User.js";
import mongoose from "mongoose";



export const Allpages = async (req, res, next) => {
  let pages;
  try {
    pages = await Page.find();
  } catch (error) {
    console.log(error);
  }
  if (!pages) {
    return res.status(404).json({ message: "No pages found" });
  }
  return res.status(200).json({ pages });
};




export const addPage = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error)
  }if(!existingUser){
    res.status(400).json({message:"unable to find user with this id"})
  }

  const page = new Page({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await page.save({session});
    existingUser.pages.push(page);
    await  existingUser.save({session});
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({messaeg:"error"})
  }
  return res.status(200).json({ page });
};




export const updatePage = async (req, res, next) => {
  const { title, description } = req.body;
  const pageId = req.params.id;
  let page;
  try {
    page = await Page.findByIdAndUpdate(pageId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!page) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json({ page });
};




export const getById = async (req, res, next) => {
  const id = req.params.id;
  let page;
  try {
    page = await Page.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!page) {
    return res.status(404).json({ message: "No page Found" });
  }
  return res.status(200).json({ page });
};




export const deletePage = async(req,res,next)=>{
  const id =req.params.id;

  let page;
  try {
    page = await Page.findByIdAndDelete(id).populate("user");
    await page.user.pages.pull(page);
    await page.user.save();
  } catch (error) {
    return console.log(error);
  }if(!page){
    return res.status(500).json({message:"unable to delete"})
  }
  return res.status(200).json({message:"Successfully deleted"})
}


export const getUserById =  async(req,res,next) =>{
  const userId = req.params.id;
  let userPages;
  try {
    userPages = await User.findById(userId).populate("page");
  } catch (error) {
    return console.log(error)
  }
  if(!userPages){
    return res.status(404).json({message:"No page found"})
}
   return res.status(200).json({pages:userPages})
}