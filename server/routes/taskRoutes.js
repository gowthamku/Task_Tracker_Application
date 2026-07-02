const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');

// Validation middleware
const validateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status value'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority value'),
  body('dueDate')
    .optional({ values: 'null' })
    .custom((value) => {
      if (value === null || value === '') return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      return true;
    }),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Stats route must be before /:id to avoid conflict
router.get('/stats/summary', getTaskStats);

router.route('/').get(getTasks).post(validateTask, handleValidation, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(validateTask, handleValidation, updateTask)
  .delete(deleteTask);

module.exports = router;
