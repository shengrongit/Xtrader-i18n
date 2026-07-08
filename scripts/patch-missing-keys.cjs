/**
 * 以 assessment_uniapp zh-Hans 为准，补全 vi/id 缺失 key，并生成新版本语言包
 */
const fs = require('fs')
const path = require('path')

const zhPath = path.resolve(__dirname, '../../assessment_uniapp/src/locale/zh-Hans.json')
const viInPath = path.resolve(__dirname, '../i18n/vi-VN.6.json')
const idInPath = path.resolve(__dirname, '../i18n/id-ID.4.json')
const manifestPath = path.resolve(__dirname, '../manifest.json')

const VI_PATCH = {
  'pages.ticketPurchaseRecord': 'Lịch sử mua vé',
  'ticketPurchaseRecord.empty': 'Chưa có lịch sử mua~',
  'ticketPurchaseRecord.buyPrefix': 'Mua',
  'ticketPurchaseRecord.recordTitle': 'Vé KH',
  'ticketPurchaseRecord.statusLabel': 'Trạng thái：',
  'ticketPurchaseRecord.buyTime': 'Thời gian mua：',
  'ticketPurchaseRecord.orderNo': 'Mã đơn：',
  'ticketPurchaseRecord.remarkLabel': 'Ghi chú：',
  'ticketPurchaseRecord.payMethod.usdtcp': 'Kênh USDTcp',
  'ticketPurchaseRecord.payMethod.usdt': 'USDT',
  'ticketPurchaseRecord.payMethod.cnycp': 'Kênh CNYcp',
  'ticketPurchaseRecord.payMethod.vndpay': 'Kênh VNDPay',
  'ticketPurchaseRecord.payMethod.cny': 'CNY',
  'ticketPurchaseRecord.payMethod.appleIap': 'Thanh toán Apple',
  'ticketPurchaseRecord.orderStatus.pass': 'Đạt',
  'ticketPurchaseRecord.orderStatus.toPay': 'Chờ TT',
  'ticketPurchaseRecord.orderStatus.reviewing': 'Đang duyệt',
  'ticketPurchaseRecord.orderStatus.rejected': 'Từ chối',
  'ticketPurchaseRecord.orderStatus.passed': 'Đã duyệt',
  'ticketPurchaseRecord.orderStatus.expired': 'Hết hạn',
  'ticketPurchaseRecord.orderStatus.amountMismatch': 'Sai số tiền',
  'ticketPurchaseRecord.orderStatus.failed': 'Thất bại',
  'pages.deleteAccount': 'Xóa tài khoản',
  'login.actions.google': 'Đăng nhập Google',
  'login.or': 'hoặc',
  'auth.toast.googleLoginFailed': 'Đăng nhập Google thất bại, thử lại',
  'auth.toast.googleLoginDebug': 'Thông tin Google đã in ra console',
  'reviveCard.payMethod.appleIap': 'Thanh toán Apple',
  'mine.deleteAccount': 'Xóa tài khoản',
  'deleteAccount.warningTitle': 'Sau khi xóa, tài khoản không thể khôi phục. Mọi dữ liệu, tài sản và quyền lợi sẽ bị xóa. Vui lòng cân nhắc kỹ!',
  'deleteAccount.actions.confirm': 'Xác nhận xóa',
  'deleteAccount.confirmModal.title': 'Xác nhận xóa tài khoản?',
  'deleteAccount.confirmModal.content': 'Sau khi xóa, tài khoản không thể khôi phục. Mọi dữ liệu, tài sản và quyền lợi sẽ bị xóa, không hỗ trợ khôi phục, khiếu nại hay bồi thường.',
  'deleteAccount.confirmModal.warningLine1': 'Thông tin đăng ký và hồ sơ cá nhân sẽ bị xóa vĩnh viễn',
  'deleteAccount.confirmModal.warningLine2': 'Tài sản ảo trong tài khoản (số dư tài khoản thi, thẻ hồi sinh, v.v.) sẽ bị xóa và không thể khôi phục',
  'deleteAccount.confirmModal.warningLine3': 'Tiến độ thi, lịch sử đóng lệnh, dữ liệu lợi nhuận không thể khôi phục, sau khi xóa không thể đăng ký lại',
  'deleteAccount.confirmModal.ackText': 'Tôi đồng ý xóa',
  'deleteAccount.confirmModal.ackTipPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.ackTipSuffix': '」 bên dưới để xác nhận bạn hiểu hậu quả',
  'deleteAccount.confirmModal.ackInputPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.ackInputSuffix': '」',
  'deleteAccount.confirmModal.enterAckPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.enterAckSuffix': '」 trước khi xác nhận xóa',
  'deleteAccount.toast.success': 'Đã xóa tài khoản',
  'deleteAccount.hint.readAgreement': 'Vui lòng đọc kỹ thông báo xóa tài khoản',
  'deleteAccount.hint.countdownPrefix': '',
  'deleteAccount.hint.countdownSuffix': 's có thể xác nhận xóa',
  'deleteAccount.toast.waitSecondsPrefix': 'Vui lòng đợi thêm ',
  'deleteAccount.toast.waitSecondsSuffix': 's trước khi xác nhận xóa',
  'deleteAccount.notice.title': 'Thông báo xóa tài khoản',
  'deleteAccount.notice.intro': 'Để bảo vệ quyền lợi của bạn, vui lòng đọc kỹ nội dung sau trước khi tiếp tục. Sau khi xóa, tài khoản không thể khôi phục. Mọi dữ liệu, tài sản và quyền lợi sẽ bị xóa, không hỗ trợ khôi phục, khiếu nại hay bồi thường. Vui lòng cân nhắc kỹ!',
  'deleteAccount.notice.section1.title': '1. Xóa tài khoản không thể hoàn tác',
  'deleteAccount.notice.section1.item1': 'Sau khi xóa, tài khoản sẽ bị vô hiệu ngay và không thể đăng nhập lại.',
  'deleteAccount.notice.section1.item2': 'Mọi dữ liệu liên quan đến tài khoản sẽ bị xóa và không thể khôi phục. Không thể đăng ký lại (kể cả đăng nhập bên thứ ba).',
  'deleteAccount.notice.section2.title': '2. Thông tin sẽ bị xóa vĩnh viễn',
  'deleteAccount.notice.section2.item1': 'Thông tin đăng ký và hồ sơ cá nhân, bao gồm biệt danh, avatar, email liên kết và thông tin xác thực danh tính.',
  'deleteAccount.notice.section2.item2': 'Tài sản ảo trong tài khoản, bao gồm số dư tài khoản thi, quyền lợi tài khoản thi trả phí, thẻ hồi sinh và các quyền lợi thi khác, sẽ bị xóa và không thể khôi phục.',
  'deleteAccount.notice.section2.item3': 'Tiến độ nhiệm vụ thi, lịch sử đóng lệnh, dữ liệu lợi nhuận, đơn mua vé và quyền lợi tài khoản thi trả phí.',
  'deleteAccount.notice.section3.title': '3. Cam kết không thể hủy bỏ',
  'deleteAccount.notice.section3.item1': 'Bạn là chủ sở hữu tài khoản đã xác thực, có đầy đủ năng lực hành vi dân sự, tự nguyện yêu cầu xóa, không bị ép buộc hay lừa dối, và chấp nhận mọi tổn thất và hậu quả phát sinh từ việc xóa.',
  'deleteAccount.notice.section4.title': '4. Quy trình xóa',
  'deleteAccount.notice.section4.item1': 'Sau khi nhấn 「Xác nhận xóa」 bên dưới và hoàn tất xác minh, hệ thống sẽ xóa tài khoản ngay lập tức.',
  'deleteAccount.notice.section4.item2': 'Theo yêu cầu bảo mật và tuân thủ, dữ liệu phải lưu trữ theo quy định pháp luật sẽ bị xóa hoàn toàn sau thời hạn lưu trữ.',
  'deleteAccount.notice.section5.title': '5. Cần trợ giúp',
  'deleteAccount.notice.section5.item1': 'Nếu gặp vấn đề trong quá trình xóa, vui lòng liên hệ qua 「Tài khoản - Hỗ trợ trực tuyến」.',
  'language.idID': 'Bahasa Indonesia',
}

const ID_PATCH = {
  'pages.ticketPurchaseRecord': 'Riwayat tiket',
  'ticketPurchaseRecord.empty': 'Belum ada riwayat beli~',
  'ticketPurchaseRecord.buyPrefix': 'Beli',
  'ticketPurchaseRecord.recordTitle': 'Tiket KH',
  'ticketPurchaseRecord.statusLabel': 'Status：',
  'ticketPurchaseRecord.buyTime': 'Waktu beli：',
  'ticketPurchaseRecord.orderNo': 'No pesanan：',
  'ticketPurchaseRecord.remarkLabel': 'Catatan：',
  'ticketPurchaseRecord.payMethod.usdtcp': 'Kanal USDTcp',
  'ticketPurchaseRecord.payMethod.usdt': 'USDT',
  'ticketPurchaseRecord.payMethod.cnycp': 'Kanal CNYcp',
  'ticketPurchaseRecord.payMethod.vndpay': 'Kanal VNDPay',
  'ticketPurchaseRecord.payMethod.cny': 'CNY',
  'ticketPurchaseRecord.payMethod.appleIap': 'Apple Pay',
  'ticketPurchaseRecord.orderStatus.pass': 'Lolos',
  'ticketPurchaseRecord.orderStatus.toPay': 'Bayar',
  'ticketPurchaseRecord.orderStatus.reviewing': 'Ditinjau',
  'ticketPurchaseRecord.orderStatus.rejected': 'Ditolak',
  'ticketPurchaseRecord.orderStatus.passed': 'Lolos',
  'ticketPurchaseRecord.orderStatus.expired': 'Kadaluarsa',
  'ticketPurchaseRecord.orderStatus.amountMismatch': 'Jumlah salah',
  'ticketPurchaseRecord.orderStatus.failed': 'Gagal',
  'pages.deleteAccount': 'Hapus akun',
  'login.actions.google': 'Masuk dengan Google',
  'login.or': 'atau',
  'auth.toast.googleLoginFailed': 'Login Google gagal, coba lagi',
  'auth.toast.googleLoginDebug': 'Info Google dicetak ke konsol',
  'reviveCard.payMethod.appleIap': 'Apple Pay',
  'mine.deleteAccount': 'Hapus akun',
  'deleteAccount.warningTitle': 'Penghapusan akun bersifat permanen. Semua data, aset, dan hak akan dikosongkan. Harap berhati-hati!',
  'deleteAccount.actions.confirm': 'Konfirmasi hapus',
  'deleteAccount.confirmModal.title': 'Konfirmasi hapus akun?',
  'deleteAccount.confirmModal.content': 'Penghapusan akun bersifat permanen. Semua data, aset, dan hak akan dikosongkan tanpa pemulihan, banding, atau kompensasi.',
  'deleteAccount.confirmModal.warningLine1': 'Info pendaftaran dan profil akan dihapus permanen',
  'deleteAccount.confirmModal.warningLine2': 'Aset virtual (termasuk saldo akun kontes, kartu revive, dll.) akan dikosongkan dan tidak dapat dipulihkan',
  'deleteAccount.confirmModal.warningLine3': 'Progres kontes, riwayat penutupan posisi, dan data profit tidak dapat dipulihkan. Pendaftaran ulang tidak memungkinkan setelah penghapusan',
  'deleteAccount.confirmModal.ackText': 'Saya setuju hapus',
  'deleteAccount.confirmModal.ackTipPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.ackTipSuffix': '」 di bawah untuk konfirmasi Anda paham konsekuensinya',
  'deleteAccount.confirmModal.ackInputPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.ackInputSuffix': '」',
  'deleteAccount.confirmModal.enterAckPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.enterAckSuffix': '」 sebelum konfirmasi hapus',
  'deleteAccount.toast.success': 'Akun dihapus',
  'deleteAccount.hint.readAgreement': 'Harap baca pemberitahuan penghapusan dengan saksama',
  'deleteAccount.hint.countdownPrefix': '',
  'deleteAccount.hint.countdownSuffix': 's lagi untuk konfirmasi hapus',
  'deleteAccount.toast.waitSecondsPrefix': 'Harap tunggu ',
  'deleteAccount.toast.waitSecondsSuffix': 's lagi sebelum konfirmasi hapus',
  'deleteAccount.notice.title': 'Pemberitahuan Penghapusan Akun',
  'deleteAccount.notice.intro': 'Untuk melindungi hak Anda, harap baca dengan saksama sebelum melanjutkan. Setelah akun dihapus, tidak dapat dipulihkan. Semua data, aset, dan hak akan dikosongkan, tanpa pemulihan, banding, atau kompensasi. Harap berhati-hati!',
  'deleteAccount.notice.section1.title': '1. Penghapusan bersifat permanen',
  'deleteAccount.notice.section1.item1': 'Setelah dihapus, akun langsung dinonaktifkan dan tidak dapat digunakan untuk masuk lagi.',
  'deleteAccount.notice.section1.item2': 'Semua data terkait akun akan dihapus dan tidak dapat dipulihkan. Pendaftaran ulang tidak memungkinkan (termasuk login pihak ketiga).',
  'deleteAccount.notice.section2.title': '2. Informasi yang akan dihapus permanen',
  'deleteAccount.notice.section2.item1': 'Info pendaftaran dan profil, termasuk nama panggilan, avatar, email terhubung, dan info verifikasi identitas.',
  'deleteAccount.notice.section2.item2': 'Aset virtual dalam akun, termasuk saldo akun kontes, hak akun kontes berbayar, kartu revive, dan hak kontes lainnya, akan dikosongkan dan tidak dapat dipulihkan.',
  'deleteAccount.notice.section2.item3': 'Progres tugas kontes, riwayat penutupan posisi, data profit, pesanan tiket, dan hak akun kontes berbayar.',
  'deleteAccount.notice.section3.title': '3. Komitmen yang tidak dapat dibatalkan',
  'deleteAccount.notice.section3.item1': 'Anda adalah pemegang akun terverifikasi dengan kapasitas hukum penuh, secara sukarela mengajukan penghapusan tanpa paksaan atau penipuan, dan menerima semua kerugian serta konsekuensi dari penghapusan.',
  'deleteAccount.notice.section4.title': '4. Proses penghapusan',
  'deleteAccount.notice.section4.item1': 'Setelah mengetuk 「Konfirmasi hapus」 di bawah dan menyelesaikan verifikasi, sistem akan segera menghapus akun Anda.',
  'deleteAccount.notice.section4.item2': 'Untuk keamanan dan kepatuhan, data yang wajib disimpan menurut hukum akan dihapus sepenuhnya setelah masa retensi berakhir.',
  'deleteAccount.notice.section5.title': '5. Butuh bantuan',
  'deleteAccount.notice.section5.item1': 'Jika mengalami masalah saat penghapusan, hubungi kami melalui 「Saya - Dukungan Online」.',
  'language.idID': 'Bahasa Indonesia',
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function applyPatch(base, patch, zhKeys) {
  const out = { ...base }
  const missing = []
  for (const key of zhKeys) {
    if (key in patch) {
      out[key] = patch[key]
      continue
    }
    if (!(key in out))
      missing.push(key)
  }
  return { out, missing }
}

function reorderByZh(zh, data) {
  const out = {}
  for (const key of Object.keys(zh)) {
    if (key in data)
      out[key] = data[key]
  }
  return out
}

function main() {
  const zh = loadJson(zhPath)
  const zhKeys = Object.keys(zh)
  const viOld = loadJson(viInPath)
  const idOld = loadJson(idInPath)

  const { out: viPatched, missing: viMissing } = applyPatch(viOld, VI_PATCH, zhKeys)
  const { out: idPatched, missing: idMissing } = applyPatch(idOld, ID_PATCH, zhKeys)

  if (viMissing.length || idMissing.length) {
    console.error('Still missing VI:', viMissing)
    console.error('Still missing ID:', idMissing)
    process.exit(1)
  }

  const viOut = reorderByZh(zh, viPatched)
  const idOut = reorderByZh(zh, idPatched)

  const manifest = loadJson(manifestPath)
  const viLang = manifest.languages.find(l => l.code === 'vi-VN')
  const idLang = manifest.languages.find(l => l.code === 'id-ID')
  const nextViVersion = String(Number(viLang.version) + 1)
  const nextIdVersion = String(Number(idLang.version) + 1)

  const viOutPath = path.resolve(__dirname, `../i18n/vi-VN.${nextViVersion}.json`)
  const idOutPath = path.resolve(__dirname, `../i18n/id-ID.${nextIdVersion}.json`)

  writeJson(viOutPath, viOut)
  writeJson(idOutPath, idOut)

  viLang.version = nextViVersion
  idLang.version = nextIdVersion
  manifest.version = new Date().toISOString().slice(0, 10)
  writeJson(manifestPath, manifest)

  console.log(`vi-VN: ${Object.keys(viOld).length} -> ${Object.keys(viOut).length} keys, v${nextViVersion}`)
  console.log(`id-ID: ${Object.keys(idOld).length} -> ${Object.keys(idOut).length} keys, v${nextIdVersion}`)
  console.log('Written:', viOutPath, idOutPath, manifestPath)
}

main()
