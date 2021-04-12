import Joi from "@hapi/joi";
//-------------Attendance teacher-----------------------
export const attendanceValidation = (data) => {
  const schema = {
    class_id: Joi.string().min(2).max(24).required(),
    teacher_id: Joi.string().min(2).max(24).required(),
    section: Joi.string().min(1).max(2).required(),
    attlist: Joi.array()
      .items({
        class_id: Joi.string().min(2).max(24).required(),
        teacher_id: Joi.string().min(2).max(24).required(),
        section: Joi.string().min(1).max(2).required(),
        student_id: Joi.string().min(2).max(24).required(),
        att_type: Joi.number().min(1).max(5).required(),
      })
      .required(),
  };
  return Joi.validate(data, schema);
};
