/**
 * 以 assessment_uniapp zh-Hans 为准，补全 vi/id 缺失 key，并生成新版本语言包
 */
const fs = require('fs')
const path = require('path')

const zhPath = path.resolve(__dirname, '../../assessment_uniapp/src/locale/zh-Hans.json')
const viInPath = path.resolve(__dirname, '../i18n/vi-VN.5.json')
const idInPath = path.resolve(__dirname, '../i18n/id-ID.3.json')
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
  'deleteAccount.warningTitle': 'Sau khi xóa, tài sản tài khoản sẽ bị xóa và không thể khôi phục',
  'deleteAccount.actions.confirm': 'Xác nhận xóa',
  'deleteAccount.confirmModal.title': 'Xác nhận xóa tài khoản?',
  'deleteAccount.confirmModal.content': 'Sau khi xóa, tài khoản, tài sản và dữ liệu liên quan sẽ bị xóa vĩnh viễn. Không thể hoàn tác.',
  'deleteAccount.confirmModal.warningLine1': 'Thông tin đăng ký và hồ sơ cá nhân sẽ bị xóa vĩnh viễn',
  'deleteAccount.confirmModal.warningLine2': 'Tài sản tài khoản (số dư, thẻ hồi sinh, v.v.) sẽ bị xóa và không thể khôi phục',
  'deleteAccount.confirmModal.warningLine3': 'Lịch sử thi đấu không thể khôi phục, bạn sẽ không thể đăng nhập bằng tài khoản này',
  'deleteAccount.confirmModal.ackText': 'Tôi đồng ý xóa',
  'deleteAccount.confirmModal.ackTipPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.ackTipSuffix': '」 bên dưới để xác nhận bạn hiểu hậu quả',
  'deleteAccount.confirmModal.ackInputPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.ackInputSuffix': '」',
  'deleteAccount.confirmModal.enterAckPrefix': 'Nhập 「',
  'deleteAccount.confirmModal.enterAckSuffix': '」 trước khi xác nhận xóa',
  'deleteAccount.toast.success': 'Đã xóa tài khoản',
  'deleteAccount.agreement.loadFailed': 'Tải thông báo xóa thất bại',
  'deleteAccount.agreement.fallback': 'Sau khi xóa tài khoản, tài sản sẽ bị xóa và không thể khôi phục. Thông tin đăng ký, lịch sử thi đấu và dữ liệu cá nhân khác cũng sẽ bị xóa. Vui lòng xác nhận bạn đã hiểu trước khi tiếp tục.',
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
  'deleteAccount.warningTitle': 'Setelah dihapus, aset akun akan dikosongkan dan tidak dapat dipulihkan',
  'deleteAccount.actions.confirm': 'Konfirmasi hapus',
  'deleteAccount.confirmModal.title': 'Konfirmasi hapus akun?',
  'deleteAccount.confirmModal.content': 'Setelah dihapus, akun, aset, dan data terkait akan dihapus permanen. Tidak dapat dibatalkan.',
  'deleteAccount.confirmModal.warningLine1': 'Info pendaftaran dan profil akan dihapus permanen',
  'deleteAccount.confirmModal.warningLine2': 'Aset akun (saldo, kartu revive, dll.) akan dikosongkan dan tidak dapat dipulihkan',
  'deleteAccount.confirmModal.warningLine3': 'Riwayat kontes tidak dapat dipulihkan, Anda tidak bisa login dengan akun ini lagi',
  'deleteAccount.confirmModal.ackText': 'Saya setuju hapus',
  'deleteAccount.confirmModal.ackTipPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.ackTipSuffix': '」 di bawah untuk konfirmasi Anda paham konsekuensinya',
  'deleteAccount.confirmModal.ackInputPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.ackInputSuffix': '」',
  'deleteAccount.confirmModal.enterAckPrefix': 'Ketik 「',
  'deleteAccount.confirmModal.enterAckSuffix': '」 sebelum konfirmasi hapus',
  'deleteAccount.toast.success': 'Akun dihapus',
  'deleteAccount.agreement.loadFailed': 'Gagal memuat pemberitahuan penghapusan',
  'deleteAccount.agreement.fallback': 'Setelah menghapus akun, aset Anda akan dikosongkan dan tidak dapat dipulihkan. Info pendaftaran, riwayat kontes, dan data pribadi lainnya juga akan dihapus. Harap konfirmasi Anda memahami sebelum melanjutkan.',
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
    if (key in out)
      continue
    if (key in patch) {
      out[key] = patch[key]
    }
    else {
      missing.push(key)
    }
  }
  return { out, missing }
}

function reorderByZh(zh, data) {
  const out = {}
  for (const key of Object.keys(zh)) {
    if (key in data)
      out[key] = data[key]
  }
  for (const key of Object.keys(data)) {
    if (!(key in out))
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
