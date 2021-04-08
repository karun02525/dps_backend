const user = await TeacherModel.findOneAndUpdate(
    { _id: req.body.teacher_id },
    {
      $set: {
        section: req.body.section,
        class_id: req.body.class_id,
        class_name: req.body.class_name,
      },
    },
    { upsert: true }
  );
