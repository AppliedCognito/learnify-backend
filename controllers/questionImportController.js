import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import asyncHandler from 'express-async-handler';
import { Question } from '../models/questionModel.js';
import { Option } from '../models/optionModel.js';
import { Answer } from '../models/answerModel.js';

export const importQuestionsFromExcel = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join('uploads', req.file.filename);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (const row of data) {
    const {
      QuestionText,
      ImageURL,
      ModuleId,
      SubModuleId,
      PaperId,
      Year,
      Difficulty,
      Explanation,
      OptionA,
      OptionB,
      OptionC,
      OptionD,
      CorrectIndex
    } = row;

    const question = await Question.create({
      text: QuestionText,
      img_url: ImageURL || '',
      module_id: ModuleId,
      sub_module_id: SubModuleId,
      paper_id: PaperId,
      year: Year,
      difficulty: Difficulty,
      explanation: Explanation,
    });

    const optionsList = [OptionA, OptionB, OptionC, OptionD];
    const savedOptions = await Promise.all(
      optionsList.map((opt) => Option.create({ question_id: question._id, option_text: opt }))
    );

    const correctOption = savedOptions[CorrectIndex];
    if (correctOption) {
      await Answer.create({
        question_id: question._id,
        option_id: correctOption._id,
      });
    }
  }

  fs.unlinkSync(filePath); // delete file after processing

  res.status(200).json({ message: 'Questions imported successfully' });
});
