# Human-resource-management
## Link Depployed app here: https://merry-hummingbird-7d69ff.netlify.app

| UserName | Password| Role  | 
|----------|---------|-------|
| admin    | admin   | admin | 
| user     | admin   | user  | 
| user1    | admin   | user  | 
| user2    | admin   | user  | 
| user3    | admin   | user  | 
| manage   | admin   | manage| 
| manage2  | admin   | manage| 
| manage3  | admin   | manage| 

 Mô tả các luồng chức năng
1. Luồng tạo mới nhân viên
Mục đích: Chức năng cho phép người dùng xem, thêm mới, chỉnh sửa xóa thông tin nhân viên tại màn hình Tạo mới
Logic xử lý: 
-	Người dùng chọn chức năng “Quản Lý” -> “Tạo Mới Nhân Viên” trên Menu -> trả về danh sách nhân viên ở trạng thái Lưu mới, Từ chối, Yêu cầu bổ sung, Chờ xử lý.
-	Thêm mới nhân viên:
•	Người dùng chọn button “Thêm mới” ở màn hình danh sách -> hiện popup nhập thông tin nhân viên gồm 3 tab: “Thông tin nhân viên”, “Thông tin văn bằng”, “Quan hệ gia đình”
•	Tab “Thông tin nhân viên”: Gồm các trường dữ liệu Tên nhân viên, mã nhân viên, giới tính, ngày sinh, địa chỉ, team, ảnh, số căn cước công dân, số điện thoại, email. 
•	Tab “Thông tin văn bằng”: Gồm các thông tin Tên văn bằng, ngày cấp, nội dung, lĩnh vực
•	Tab “Quan hệ gia đình”: Gồm các thông tin Họ tên, giới tính, ngày sinh, số căn cước công dân, mối quan hệ, địa chỉ
o	Sau khi nhập đầy đủ thông tin, bấm Lưu để lưu lại thông tin nhân viên vừa nhập, Hủy để dừng thao tác, Đăng ký để nộp hồ sơ đăng ký nhân viên
-	Chỉnh sửa nhân viên: Người dùng lựa chọn thao tác chỉnh sửa (icon hình cây bút ở cột thao tác) -> mở dialog và hiển thị đầy đủ thông tin bản ghi đã chọn, chỉnh sửa thông tin và bấm lưu để lưu lại thông tin đã chỉnh sửa hoặc bấm đăng ký để nộp hồ sơ. Thao tác này hiển thị ở trạng thái Lưu mới, Yêu cầu bổ sung, từ chối
-	Xem thông tin chi tiết: Người dùng lựa chọn thao tác xem (icon hình con mắt ở cột thao tác) -> mở dialog xem thông tin và fill đầy đủ dữ liệu của bản ghi, không được phép chỉnh sửa. Thao tác này hiển thị với những bản ghi có trạng thái Chờ xử lý, Chờ nộp hồ sơ, chờ duyệt
-	Xóa nhân viên: Người dùng lựa chọn thao tác xóa -> mở popup xác nhận: chọn Đồng ý để xóa, Hủy để dừng thao tác 
-	Các button: Lưu, Đăng ký, Hủy
•	Bấm “Lưu” -> Lưu thông tin nhân viên -> Hiện button “Đăng ký”
•	Bấm “Hủy” -> Đóng dialog thêm mới thông tin nhân viên
•	Nút “Đăng ký”: Hiển thị sau khi bấm lưu thông tin nhân viên
-	Các thao tác:
•	Chỉnh sửa: Hiển thị ở trạng thái Lưu mới -> chỉnh sửa thông tin nhân viên, trạng thái Yêu cầu bổ sung -> chỉnh sửa thông tin biểu mẫu
•	Xóa: Hiển thị ở trạng thái Lưu mới
•	Xem: Hiển thị ở trạng thái Từ chối, Chờ xử lý, Chờ duyệt, Đã duyệt
2. Luồng đăng ký nhân viên
Mục đích: Cho phép quản lý nộp hồ sơ đăng ký và trình lãnh đạo phê duyệt thông tin hồ sơ của nhân viên.
Logic xử lý:
-	Sau khi lưu thông tin nhân viên thì hiện nút “Đăng ký” -> bấm “Đăng ký” -> hiện ra dialog nhập thông tin hồ sơ gồm Sơ yếu lý lịch, Đơn đăng ký… Cho phép người dùng nhập thông tin, lưu thông tin, trình lãnh đạo phê duyệt.
-	Màn hình sẽ chia làm 2 phần: Phần bên trái hiển thị danh sách hồ sơ và có thể chuyển qua lại giữa các loại hồ sơ khác nhau. Phần bên phải hiển thị nội dung hồ sơ và cho phép người dùng nhập thông tin.
-	Các button: Lưu, Gửi lãnh đạo, Hủy
-	Lưu: Cho phép người dùng lưu thông tin hồ sơ vừa mới nhập
-	Gửi lãnh đạo: Mở popup trình lãnh đạo
-	Hủy: Đóng dialog
-	Trình lãnh đạo:
•	Gồm các trường thông tin: Ngày trình, tên lãnh đạo, chức vụ, nội dung trình lãnh đạo. 
•	Lưu ý: Tên lãnh đạo là combobox field, có thể khai báo một object gồm tên và chức vụ. Khi chọn Lãnh đạo thì fill chức vụ theo lãnh đạo.
•	Sau khi nhập đầy đủ thông tin bấm trình lãnh đạo -> hiển thị sang màn hình Lãnh đạo/Chờ duyệt với trạng thái Chờ xử lý, đồng thời cũng hiển thị ở menu Tạo mới với trạng thái Chờ xử lý và chỉ được xem thông tin nhân viên
3. Luồng lãnh đạo chờ duyệt
Mục đích: Hiển thị các bản ghi ở trạng thái Chờ duyệt/Chờ xử lý, cho phép tài khoản role lãnh đạo Phê duyệt, Yêu cầu bổ sung, Từ chối yêu cầu đăng ký hồ sơ và xem thông tin hồ sơ
Logic xử lý: 
-	Người dùng chọn bản ghi -> hiển thị dialog gồm thông tin của nhân viên, hồ sơ đã gửi đăng ký và có các button Phê duyệt, Yêu cầu bổ sung, Từ chối, Hủy
-	Phê duyệt: Hiển thị popup gồm các thông tin: checkbox Đã đủ điều kiện phê duyệt, ngày hẹn -> Xác nhận, Hủy
-	Yêu cầu bổ sung: Hiển thị popup Nội dung yêu cầu bổ sung
-	Từ chối: Hiển thị popup nhập Ngày từ chối, lý do từ chối
-	Hủy: Đóng dialog
Lưu ý: BE cần xử lý phần phân quyền cho từng tài khoản theo cấp lãnh đạo và cấp quản lý để FE dựa vào đấy để check hiển thị cũng như thực hiện các chức năng theo quyền. Đối với từng bản ghi chỉ được phép chỉnh sửa khi tài khoản đăng nhập chính là tài khoản tạo bản ghi đó, trong trường hợp không phải là tài khoản tạo thì chỉ được phép xem.
4. Biểu mẫu
Gồm các biểu mẫu: 
-	Sơ yếu lý lịch, CV, Bằng cấp, Báo cáo đề xuất, Quyết định tăng lương/thăng chức
-	Bằng cấp: sẽ hiển thị ra danh sách các văn bằng của nhân viên đã nhập trước đấy, có thể thêm hàng và nhập thêm dữ liệu văn bằng vào => bấm Lưu biểu mẫu sẽ lưu được thông tin văn bằng vừa nhập
Logic xử lý:
-	Ở role Quản lý cho phép nhập các thông tin của biểu mẫu
-	Role Lãnh đạo chỉ được phép xem thông tin và nhập ở mục Ý kiến của lãnh đạo
-	Màn hình Tạo mới nhân viên:
•	Bước 1: Nhập đầy đủ thông tin nhân viên, quan hệ gia đình, bằng cấp -> bấm Đăng ký
•	Bước 2: Hiển thị dialog các biểu mẫu để nhập thông tin
•	Bước 3:  
•	Bấm lưu để lưu lại thông tin vừa nhập
•	Bấm Trình lãnh đạo -> hiển thị popup nhập ngày gửi, người gửi, chức vụ, nội dung gửi.
•	Bấm Hủy -> đóng dialog
•	Bấm In -> In thông tin biểu mẫu
•	Bấm <, > để chuyển qua lại giữa các biểu mẫu
•	Lưu ý: 
•	Nhập thông tin biểu mẫu => Lưu => Vào lại thì vẫn xem được thông tin biểu mẫu đã lưu trước đó và có thể chỉnh sửa
•	Button Trình lãnh đạo chỉ hiển thị khi đã lưu hết các biểu mẫu
•	Khi trình lãnh đạo thành công thì chuyển trạng thái của bản ghi => cho phép xem lại thông tin biểu mẫu và không được chỉnh sửa
-	Màn hình Lãnh đạo:
Cho phép xem thông tin biểu mẫu, nhập ý kiến, thực hiện Phê duyệt đăng ký hồ sơ hoặc kết thúc hồ sơ, yêu cầu bổ sung, từ chối yêu cầu đăng ký
5. Luồng quản lý nhân viên
Mục đích: Hiển thị danh sách nhân viên đã được lãnh đạo phê duyệt đăng ký hồ sơ, cho phép người dùng thực hiện cập nhật diễn biến, Kết thúc hồ sơ
Logic xử lý: Bản ghi thông tin nhân viên sau khi đã được lãnh đạo duyệt sẽ hiển thị ở màn hình quản lý nhân viên, cho phép người dùng xem thông tin nhân viên, cập nhật diễn biến và kết thúc hồ sơ
6. Luồng kết thúc
Mục đích: Cho phép người dùng role quản lý kết thúc hồ sơ đang hiện hành
Logic xử lý: Tại màn hình quản lý -> chọn bản ghi muốn kết thúc -> bấm Kết thúc -> Hiển thị popup nhập Ngày kết thúc, lý do kết thúc -> bấm Xác nhận -> Hiển thị sang màn hình Kết thúc.
7. Luồng cập nhật diễn biến
Mục đích: Cho phép người dùng cập nhật diễn biến, quá trình hoạt động của nhân viên ở công ty.
Logic xử lý: 
-	Chọn bản ghi muốn cập nhật diễn biến -> chọn Loại diễn biến -> Hiển thị các trường thông tin cần nhập vào theo từng loại diễn biến (Các trường thông tin nhập sẽ hiển thị lên đầu, và bảng danh sách ở dưới, sau khi nhập thông tin thì có thể lưu, cập nhật và xóa thông tin của từng loại diễn biến)
-	Đăng ký hồ sơ: 
•	Gồm các trường dữ liệu Ngày đăng ký, Các loại hồ sơ đã nộp (hiện dưới dạng bảng nếu có thể), Nội dung, Ghi chú.
•	Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
-	Tăng lương: 
•	Gồm các trường dữ liệu Ngày tăng lương, Lần thứ, Lý do, Bậc, Ghi chú.
•	Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
•	Hiển thị danh sách biểu mẫu Quyết định tăng lương và biểu mẫu Sơ yếu lý lịch
-	Thăng chức: 
•	Gồm các trường dữ liệu Ngày thăng chức, Lần thứ, Lý do, Chức vụ hiện tại, Chức vụ cũ, Ghi chú.
•	Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
•	Hiển thị danh sách biểu mẫu Quyết định thăng chức và biểu mẫu Sơ yếu lý lịch
-	Đề xuất, tham mưu: 
•	Gồm các trường dữ liệu Ngày diễn biến, Nội dung, Ghi chú, Loại (đề xuất, tham mưu) -> hiển thị thêm trường mô tả chi tiết.
•	Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
•	Hiển thị danh sách biểu mẫu Báo cáo đề xuất
•	Sau khi nhập thông tin biểu mẫu -> tiếp theo trình tự trình lãnh đạo, mỗi loại biểu mẫu và loại diễn biến sẽ có từng loại đề xuất khác nhau
 
8. Luồng nộp lưu hồ sơ
Mục đích: Sau khi hồ sơ kết thúc, bản ghi được hiển thị ở menu Kết thúc và cho phép người dùng nộp lưu trữ thông tin hồ sơ
Logic xử lý: Tại màn hình kết thúc, chọn bản ghi muốn Nộp lưu -> Hiện popup nhập Ngày quyết định, Số lưu -> bấm Xác nhận -> đóng dialog và hiển thị ngày quyết định, số lưu ra màn hình Kết thúc, trạng thái chuyển thành Đã nộp lưu
9. Biểu mẫu
Gồm các biểu mẫu:
 Báo cáo đề xuất, Quyết định tăng lương/thăng chức, Đơn xin nghỉ việc
Logic xử lý:
-	Ở Role Quản lý cho phép nhập các thông tin của biểu mẫu
-	Role Lãnh đạo chỉ được phép xem thông tin và nhập ở mục Ý kiến của lãnh đạo
-	Màn hình Lãnh đạo: Cho phép xem thông tin biểu mẫu, nhập ý kiến, thực hiện Phê duyệt, yêu cầu bổ sung, từ chối biểu  mẫu
-	Màn hình quản lý nhân viên -> Kết thúc:
•	Gồm biểu mẫu quyết định kết thúc hồ sơ
•	Bước 1: Quản lý nhập thông tin quyết định về việc,  kính gửi, ….
•	Bước 2: Bấm trình lãnh đạo -> hiển thị ở màn hình chờ duyệt với loại yêu cầu Kết thúc hồ sơ
•	Bước 3: Lãnh đạo có thể Phê duyệt -> hiển thị ở menu kết thúc với trạng thái Kết thúc; Yêu cầu bổ sung -> hiển thị ở màn hình Quản lý với trạng thái Yêu cầu bổ sung (Phân biệt với yêu cầu bổ sung lúc đăng ký hồ sơ); Từ chối -> hiển thị ở màn hình Quản lý với trạng thái Từ chối
 
