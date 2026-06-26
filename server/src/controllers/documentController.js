import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  try {
    const document = await Document.create({
      title: "Untitled Document",
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { title, language, code } = req.body;

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title,
        language,
        code,
      },
      {
        new: true,
      }
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};