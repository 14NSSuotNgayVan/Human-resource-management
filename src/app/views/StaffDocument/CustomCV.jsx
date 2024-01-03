import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../src/styles/views/_cv.scss";
import { GENDER, TEAM } from "app/constants/staffConstant";
import moment from "moment";
import { getNumberOfLines, removeEmptyLines, splitStringByNewLine } from "utils";
import { Button, Fab, Icon, IconButton } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ExperienceDialog from "./ExperienceDialog";
import { getExperiencesByEmployeeId, getShouldUpdateExperience } from "app/redux/selectors/ExperienceSelector";
import { deleteExperience, getAllExperiences, setExperience } from "app/redux/actions/ExperienceAction";
import { ConfirmationDialog } from "egret";

const CustomCV = (props) => {
  const { t, formData, setFormData,isRegister } = props;
  const [isEditSkill, setIsEditSkill] = useState(false);
  const [isEditActivity, setIsEditActivity] = useState(false);
  const [showExperienceDialog, setShowExperienceDialog] = useState(false);
  const [skillLine, setSkillLine] = useState(4);
  const [activityLine, setActivityLine] = useState(4);
  const experiencesList = useSelector(getExperiencesByEmployeeId);
  const shouldUpdateExperiences = useSelector(getShouldUpdateExperience);
  const [showConfirmationDialog,setShowConfirmationDialog] = useState(false);
  const [currentExperienceId,setCurrentExperienceId] = useState(""); 
  const dispatch = useDispatch();
  useEffect(() => {
    if (shouldUpdateExperiences) dispatch(getAllExperiences(formData?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateExperiences, formData?.id]);

  useEffect(() => {
    setSkillLine(getNumberOfLines(formData?.skill));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.skill]);
  useEffect(() => {
    setActivityLine(getNumberOfLines(formData?.activity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.activity]);
  const handleSubmitSkill = () => {
    setFormData({
      ...formData,
      skill: removeEmptyLines(formData?.skill),
    });
    setIsEditSkill(false);
  };
  const handleSubmitActivity = () => {
    setFormData({
      ...formData,
      activity: removeEmptyLines(formData?.activity),
    });
    setIsEditActivity(false);
  };
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    if (!value.startsWith(" ")) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleCancel = () => {
    setIsEditSkill(false);
    setIsEditActivity(false);
    setShowConfirmationDialog(false);
    setShowExperienceDialog(false);
  };
  const handleShowFormSkill = () => {
    setIsEditSkill(true);
  };
  const handleShowFormActivity = () => {
    setIsEditActivity(true);
  };
  const handleShowExperienceDialog = (item) => {
    dispatch(setExperience(item));
    setShowExperienceDialog(true);
  };
  const handleDeleteExperience=(id)=>{
    setCurrentExperienceId(id);
    setShowConfirmationDialog(true);
  }
  const handleConfirmDelete=()=>{
    dispatch(deleteExperience(currentExperienceId));
    handleCancel();
  }
  return (
    <>
      <div className="cv">
        <div className="left-content">
          <div className="cv-profile">
            <div className="profile-avatar">
              <img alt="avatar" src={formData?.image || "/assets/images/avatar.jpg"} />
            </div>
            <p className="profile-email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              {formData?.email}
            </p>
            <p className="profile-phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span>{formData?.phone}</span>
            </p>
          </div>
          <div className="cv-skills">
            <h4 className="skills-tittle">
              kỹ năng
              {isRegister && <IconButton
                size="small"
                onClick={() => {
                  handleShowFormSkill();
                }}
              >
                <Icon fontSize="small" color="primary">
                  edit
                </Icon>
              </IconButton>}
            </h4>
            <div>
              {isEditSkill && (
                <>
                  <ValidatorForm>
                    <TextValidator
                      multiline
                      rows={skillLine}
                      fullWidth
                      
                      className="mt-16 profile-input-text"
                      name="skill"
                      value={formData?.skill || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={[t("staff.notify.errorMessages_required")]}
                    />
                    <Button className="mt-12 mr-12" variant="contained" color="primary" onClick={handleSubmitSkill}>
                      {t("general.save")}
                    </Button>
                    <Button className="mt-12 color-error" variant="contained" onClick={handleCancel}>
                      {t("general.cancel")}
                    </Button>
                  </ValidatorForm>
                </>
              )}
            </div>
            <ul className="skill-list">
              {!isEditSkill &&
                formData?.skill &&
                splitStringByNewLine(formData?.skill) !== null &&
                splitStringByNewLine(formData?.skill).map((formData, index) => <li key={index}>{formData}</li>)}
            </ul>
          </div>
          <div className="cv-skill-rating">
            <h4 className="skill-rating-tittle">Ngoại ngữ</h4>
            <div className="skill-rating-content">
              <div className="skill-rating-content-item">
                <span>Tiếng anh</span>
                <div className="rating-wrapper">
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                </div>
              </div>
              <div className="skill-rating-content-item">
                <span>Tiếng trung</span>
                <div className="rating-wrapper">
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                  <div className="cv-rating rating-disabled"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="cv-skill-rating">
            <h4 className="skill-rating-tittle">Tin học</h4>
            <div className="skill-rating-content">
              <div className="skill-rating-content-item">
                <span>Word</span>
                <div className="rating-wrapper">
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                </div>
              </div>
              <div className="skill-rating-content-item">
                <span>Excel</span>
                <div className="rating-wrapper">
                  <div className="cv-rating"></div>
                  <div className="cv-rating"></div>
                  <div className="cv-rating rating-disabled"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="cv-activity">
            <h4 className="activity-tittle">
              Hoạt động
              {isRegister &&<IconButton
                size="small"
                onClick={() => {
                  handleShowFormActivity();
                }}
              >
                <Icon fontSize="small" color="primary">
                  edit
                </Icon>
              </IconButton>}
            </h4>
            <div className="activity-content">
              <div className="activity-formData">
                <div>
                  {isEditActivity && (
                    <>
                      <ValidatorForm>
                        <TextValidator
                          multiline
                          rows={activityLine}
                          fullWidth
                          
                          className="mt-16 profile-input-text"
                          name="activity"
                          value={formData?.activity || ""}
                          onChange={handleChange}
                          validators={["required"]}
                          errorMessages={[t("staff.notify.errorMessages_required")]}
                        />
                        <Button
                          className="mt-12 mr-12"
                          variant="contained"
                          color="primary"
                          onClick={handleSubmitActivity}
                        >
                          {t("general.save")}
                        </Button>
                        <Button className="mt-12 color-error" variant="contained" onClick={handleCancel}>
                          {t("general.cancel")}
                        </Button>
                      </ValidatorForm>
                    </>
                  )}
                </div>
                <ul className="activity-list">
                  {!isEditActivity &&
                    formData?.activity &&
                    splitStringByNewLine(formData?.activity) !== null &&
                    splitStringByNewLine(formData?.activity).map((formData, index) => <li key={index}>{formData}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="cv-tittle border-left">
            <h1 className="tittle-name">{formData?.name}</h1>
            <h4 className="job-tittle">{TEAM[formData?.team]?.name}</h4>
          </div>
          <div className="cv-details">
            <div className="details-gender">
              <img alt="icon" src="/assets/images/gender.png" />
              <span>{t(`staff.gender.${GENDER[formData?.gender]?.name}`)}</span>
            </div>
            <div className="details-birthday">
              <img alt="icon" src="/assets/images/cake.png" />
              <span>{moment(new Date(formData?.dateOfBirth)).format("DD/MM/YYYY")}</span>
            </div>
            <div className="details-address">
              <img alt="icon" src="/assets/images/location.png" />
              <span>{formData?.address}</span>
            </div>
          </div>
          <div className="cv-goals border-left">
            <h3 className="goals-tittle">Mục tiêu nghề nghiệp</h3>
            <div className="goals-layer">
              <span className="goals-quotes_left">&#699;&#699;</span>
              <p className="goals-content">
                Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một nhân viên
                bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách
                hàng và mở rộng tập khách hàng.
                <span className="goals-quotes_right">&#700;&#700;</span>
              </p>
            </div>
          </div>
          <div className="cv-experiences border-left">
            <h3 className="experiences-heading">
              kinh nghiệm làm việc
              {isRegister&& <Fab
                color="primary"
                aria-label="Add"
                className="icon-button-md"
                onClick={() => {
                  handleShowExperienceDialog({});
                }}
              >
                <Icon>add</Icon>
              </Fab>}
            </h3>
            {experiencesList != null &&
              experiencesList.map((experience) => (
                <>
                  <div className="cv-experience">
                    <h4 className="experience-tittle">
                      <div>
                        <span className="experience-process">
                          {moment(experience?.startDate).format("DD/MM/YYYY")} -{" "}
                          {moment(experience?.endDate).format("DD/MM/YYYY")}
                        </span>
                        <span className="experience-dot">&#x2022;</span>
                        <span className="experience-company">{experience?.companyName}</span>
                      </div>
                      {isRegister&&<div>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleShowExperienceDialog(experience);
                          }}
                        >
                          <Icon fontSize="small" color="primary">
                            edit
                          </Icon>
                        </IconButton>
                        <IconButton size="small" onClick={() => {
                          handleDeleteExperience(experience?.id);
                        }}>
                          <Icon fontSize="small" color="error">
                            delete
                          </Icon>
                        </IconButton>
                      </div>}
                    </h4>
                    <h5 className="experience-job">{experience?.companyAddress}</h5>
                    <div className="experience-list">
                      {experience?.jobDescription &&
                        splitStringByNewLine(experience?.jobDescription) &&
                        splitStringByNewLine(experience?.jobDescription).map((item) => (
                          <span className="experience-detail">
                            <span className="detail-dot">&#x2022;</span>
                            <span className="detail-content">{item}</span>
                          </span>
                        ))}
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className="cv-certificates border-left">
            <h3 className="certificates-tittle">Chứng chỉ</h3>
            <div className="certificates-list">
              {formData?.certificatesDto !== null &&
                formData?.certificatesDto?.map((formData) => (
                  <span className="certificates-detail">
                    <span className="detail-dot">&#x2022;</span>
                    <span className="detail-content">
                      {moment(formData?.issueDate)?.year()}:{formData?.content}.
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </div>
        {showExperienceDialog && <ExperienceDialog t={t} handleCloseDialog={handleCancel} staffId={formData?.id} />}
        {showConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          open={showConfirmationDialog}
          onConfirmDialogClose={handleCancel}
          onYesClick={handleConfirmDelete}
          text={t("general.deleteConfirm")}
          Yes={t("general.Yes")}
          No={t("general.No")}
        />
      )}
      </div>
    </>
  );
};
export default CustomCV;
