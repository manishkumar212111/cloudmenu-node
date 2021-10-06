const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const NotificationValidation = require('../../validations/notification.validation');
const NotificationController = require('../../controllers/notification.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageNotifications'), validate(NotificationValidation.createNotification), NotificationController.createNotification)
  .get(auth('getNotifications'), validate(NotificationValidation.getNotifications), NotificationController.getNotifications);

router
  .route('/:notificationId')
  .get(auth('manageNotifications'), validate(NotificationValidation.getNotification), NotificationController.getNotification)
  .patch(auth('manageNotifications'), validate(NotificationValidation.updateNotification), NotificationController.updateNotification)
  .delete(auth('manageNotifications'), validate(NotificationValidation.deleteNotification), NotificationController.deleteNotification);


module.exports = router;
