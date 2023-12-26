import { imageSelector } from 'app/redux/selectors/StaffSelector';
import React from 'react';
import { useSelector } from 'react-redux';
import '../../../src/styles/views/_cv.scss';
const CustomCV = (props) => {
    const { t } = props;
    const staffImageUrl = useSelector(imageSelector);

    return (
        <>
            <div className="cv">
                <div className='left-content'>
                    <div className="cv-profile">
                        <div className="profile-avatar">
                            <img alt="avatar" src={staffImageUrl || "/assets/images/avatar.jpg"} />
                        </div>
                        <p className="profile-email"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                            quynhmy92@gmail.com</p>
                        <p className="profile-phone"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                            <span>0932445566</span></p>
                    </div>
                    <div className="cv-skills">
                        <h4 className="skills-tittle">kỹ năng</h4>
                        <ul className="skill-list">
                            <li key="1">Giao tiếp tốt với khách hàng</li>
                            <li key="2">Thuyết phục</li>
                            <li key="3">Thương lượng</li>
                            <li key="4">Làm việc nhóm</li>
                            <li key="5">Chịu được áp lực cao</li>
                        </ul>
                    </div>
                    <div className="cv-skill-rating">
                        <h4 className="skill-rating-tittle">Ngoại ngữ</h4>
                        <div className="skill-rating-content">
                            <div className="skill-rating-content-item">
                                <span>Tiếng anh</span>
                                <div className='rating-wrapper'>
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
                                <div className='rating-wrapper'>
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
                        <h4 className="activity-tittle">Hoạt động</h4>
                        <div className="activity-content">
                            <div className="activity-item">
                                <p className="activity-process">01/2019 - 03/2022</p>
                                <h5 className="activity-name">tình nguyện viên</h5>
                                <ul className="activity-list">
                                    <li>Tập hợp các món quà và phân phát tới người vô gia cư</li>
                                    <li>Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan hơn trong cuộc sống.</li>
                                </ul>
                            </div>
                            <div className="activity-item">
                                <p className="activity-process">02/2019 - 05/2022</p>
                                <h5 className="activity-name">tình nguyện viên</h5>
                                <ul className="activity-list">
                                    <li>Tham gia đội tình nguyện dạy học cho trẻ em làng SOS - Cầu Giấy</li>
                                    <li>Tham gia hiến máu năm 2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right-content'>
                    <div className="cv-tittle border-left">
                        <h1 className="tittle-name">Nguyễn trúc quỳnh my</h1>
                        <h4 className="job-tittle">nhân viên kinh doanh</h4>
                    </div>
                    <div className="cv-details">
                        <div className="details-gender">
                            <img alt="icon" src="/assets/images/gender.png" />
                            <span>Nữ</span>
                        </div>
                        <div className="details-birthday">
                            <img alt="icon" src="/assets/images/cake.png" />
                            <span>10/10/1992</span>
                        </div>
                        <div className="details-address">
                            <img alt="icon" src="/assets/images/location.png" />
                            <span>23 Trần Cao Văn, Quận 1</span>
                        </div>
                    </div>
                    <div className="cv-goals border-left">
                        <h3 className="goals-tittle">Mục tiêu nghề nghiệp</h3>
                        <div className="goals-layer">
                            <span className="goals-quotes_left">&#699;&#699;</span>
                            <p className="goals-content">
                                Áp dụng những king nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách hàng và mở rộng tập khách hàng.
                                <span className="goals-quotes_right">&#700;&#700;</span>
                            </p>

                        </div>
                    </div>
                    <div className="cv-experiences border-left">
                        <h3 className="experiences-heading">
                            kinh nghiệm làm việc
                        </h3>
                        <div className="cv-experience">
                            <h4 className="experience-tittle">
                                <span className="experience-process">05/2019 - 05/2022</span>
                                <span className="experience-dot">&#x2022;</span>
                                <span className="experience-company">siêu việt group</span>
                            </h4>
                            <h5 className="experience-job">trưởng nhóm kinh doanh</h5>
                            <div className="experience-list">
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Giới thiệu, tư vấn sản phẩm, giải đáp thắc mắc của khách hàng tại cửa hàng và tại website của công ty.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Giúp công ty tăng 10% doanh thu nhờ việc tư vẫn mua thêm sản phẩm kèm theo.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Chịu trách nhiệm giải quyết vấn đề bảo hành, đổi trả sản phẩm.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Chịu trách nhiệm quản lý của hàng khi không có mặt của hàng trưởng.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Theo dõi, kiểm tra hàng hóa nhập, xuất kho.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Đảm bảo khu vực bán hàng sạch sẽ, gọn gàng, ngăn nắp.</span></span>
                            </div>
                        </div>
                        <div className="cv-experience">
                            <h4 className="experience-tittle">
                                <span className="experience-process">01/2019 - 08/2019</span>
                                <span className="experience-dot">&#x2022;</span>
                                <span className="experience-company">cửa hàng siêu việt</span>
                            </h4>
                            <h5 className="experience-job">nhân viên bán hàng</h5>
                            <div className="experience-list">
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Bán hàng trực tiếp tại cửa hàng cho người Việt và người Nhật.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Quản lí, báo cáo doanh thu trong ngày.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Kiểm kê hàng hóa trong kho, kiểm tra nhập hàng.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Phản hồi thắc mắc của khách hàng qua kênh Facebook, instagram, website.</span></span>
                            </div>
                        </div>
                        <div className="cv-experience">
                            <h4 className="experience-tittle">
                                <span className="experience-process">02/2017 - 10/2017</span>
                                <span className="experience-dot">&#x2022;</span>
                                <span className="experience-company">cửa hàng VIETSV</span>
                            </h4>
                            <h5 className="experience-job">nhân viên bán hàng part-time</h5>
                            <div className="experience-list">
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Bán hàng trực tiếp tại cửa hàng cho người Việt và người Nhật.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Quản lí, báo cáo doanh thu trong ngày.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Kiểm kê hàng hóa trong kho, kiểm tra nhập hàng.</span></span>
                                <span className="experience-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">Phản hồi thắc mắc của khách hàng qua kênh Facebook, instagram, website.</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="cv-certificates border-left">
                        <h3 className="certificates-tittle">Chứng chỉ</h3>
                        <div className="certificates-list">
                        <span className="certificates-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">2017:Giải nhất Tài năng SV.</span></span>
                        <span className="certificates-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">2018:Nhân viên xuất sắc nhất năm.</span></span>
                        <span className="certificates-detail"><span className="detail-dot">&#x2022;</span><span className="detail-content">2021:TOEC 800.</span></span>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
export default CustomCV;