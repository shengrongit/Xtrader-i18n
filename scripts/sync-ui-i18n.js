/**
 * 仅同步 UI 短文案：以 zh-Hans 为准，长度 >50 或 guide/长段落 保留 vi/id 原译文
 */
const fs = require('fs')
const path = require('path')

const zhPath = path.resolve(__dirname, '../../assessment_uniapp/src/locale/zh-Hans.json')
const viPath = path.resolve(__dirname, '../i18n/vi-VN.5.json')
const idPath = path.resolve(__dirname, '../i18n/id-ID.3.json')
const viUiPath = path.resolve(__dirname, './ui-vi.json')
const idUiPath = path.resolve(__dirname, './ui-id.json')

const SKIP_PREFIX = [
  'guide.steps.',
  'guidePaid.steps.',
  'guideTrading.steps.',
  'guide.tips.texts.',
  'guidePaid.tips.',
  'guideTrading.tips.',
  'openMt5Account.tips.paid.',
  'buyReviveCard.tips.item',
  'buyReviveCard.modal.successContent',
  'kyc.facePrivacy.notice',
  'kyc.h5TransitionModal.content',
  'home.androidDownloadBanner.wechatTip.content',
  'reviveGiftRecord.tips.line',
]

function shouldSkipKey(key, zhValue) {
  if (key === 'contractConfirm.contractBody') return true
  if (SKIP_PREFIX.some((p) => key.startsWith(p))) return true
  if ((zhValue || '').length > 50) return true
  return false
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function main() {
  const zh = loadJson(zhPath)
  const viOld = loadJson(viPath)
  const idOld = loadJson(idPath)
  const viUi = loadJson(viUiPath)
  const idUi = loadJson(idUiPath)

  const viOut = { ...viOld }
  const idOut = { ...idOld }

  for (const key of Object.keys(zh)) {
    const zhVal = zh[key]
    if (shouldSkipKey(key, zhVal)) continue
    if (key in viUi) viOut[key] = viUi[key]
    if (key in idUi) idOut[key] = idUi[key]
  }

  // 备案号外置语言置空
  viOut['home.icp'] = ''
  idOut['home.icp'] = ''

  fs.writeFileSync(viPath, `${JSON.stringify(viOut, null, 2)}\n`, 'utf8')
  fs.writeFileSync(idPath, `${JSON.stringify(idOut, null, 2)}\n`, 'utf8')

  const uiCount = Object.keys(zh).filter((k) => !shouldSkipKey(k, zh[k])).length
  const viApplied = Object.keys(viUi).length
  const idApplied = Object.keys(idUi).length
  console.log(`UI keys (zh): ${uiCount}, vi map: ${viApplied}, id map: ${idApplied}`)
  console.log('Written:', viPath, idPath)
}

main()
