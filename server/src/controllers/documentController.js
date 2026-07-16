import Document from "../models/Document.js";

// export const createDocument = async (req, res) => {
//   try {
//     const document = await Document.create({
//       title: "Untitled Document",
//     });

//     res.status(201).json(document);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getDocument = async (req, res) => {
  try {
    if (!req.document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json(req.document);
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
      },
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

export const renameDocument = async (req, res) => {
  try {
    req.document.title = req.body.title;

    await req.document.save();

    res.status(200).json({
      success: true,
      document: req.document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await req.document.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
