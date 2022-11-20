
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType,
	jidDecode
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { state, saveState } = useSingleFileAuthState('./session.json')
const config = require('./config')
const prefix = '.'
const owner = ['94761327688']
const axios = require('axios')
const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})

	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('Bot Connected')
		}
	})

	conn.ev.on('creds.update', saveState)

	conn.ev.on('messages.upsert', async (mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return

			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid

			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId ? mek.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''


			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''

			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'

			const isMe = botNumber.includes(senderNumber)
			const isowner = owner.includes(senderNumber) || isMe

			const reply = (teks) => {
				conn.sendMessage(from, { text: teks }, { quoted: mek })
			}

			const isSUB = from == config.SENDJID ? true : false


			switch (command) {

				case 'jid': try {
					if (!from) return
					reply(from)
				}
					catch (e) {
						await conn.sendMessage(from, { text: '*Error ⛔*' }, { quoted: mek })
					}

					break

				//......................................................Commands..............................................................\\

				case 'arrow': {
					let start2 = 10

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						caption: "Arrow | 2012 - 2020 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/b045071036852fadac8a1.jpg" }
					})

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					// Arrow Season - 1

					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E01_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E01 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E02_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E02 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E03_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E03 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E04_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E04 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E05_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E05 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E06_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E06 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E07_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E07 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E08_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E08 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E09_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E09 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E10_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E10 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E11_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E11 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E12_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E12 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E13_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E13 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E14_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E14 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E15_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E15 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E16_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E16 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E17_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E17 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E18_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E18 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E19_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E19 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E20_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E20 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E21_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E21 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E22_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E22 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E23_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E23 2013 .mkv'
					})

					// Arrow Season - 2

					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪②' })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E01_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E01 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E02_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E02 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E03_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E03 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E04_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E04 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E05_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E05 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E06_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E06 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E07_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E07 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E08_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E08 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E09_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E09 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E10_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E10 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E11_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E11 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E12_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E12 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E13_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E13 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E14_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E14 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E15_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E15 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E16_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E16 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E17_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E17 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E18_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E18 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E19_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E19 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E20_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E20 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E21_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E21 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E22_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E22 2014 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E23_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S02E23 2014 .mkv'
					})

					// Arrow Season - 3

					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪②' })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E01_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E01 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E02_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E02 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E03_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E03 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E04_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E04 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E05_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E05 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E06_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E06 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E07_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E07 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E08_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E08 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E09_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E09 2012 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E10_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E10 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E11_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E11 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E12_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E12 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E13_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E13 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E14_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E14 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E15_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E15 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E16_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E16 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E17_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E17 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E18_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E18 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E19_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E19 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E20_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E20 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E21_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E21 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E22_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E22 2013 .mkv'
					})
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E23_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S01E23 2013 .mkv'
					})


					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'flash': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						caption: "Arrow | 2012 - 2020 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/b045071036852fadac8a1.jpg" }
					})

					conn.sendMessage(from, { text: '' })

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						document: { url: '' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro  .mkv'
					})

					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break


				default:

					if (isowner && body.startsWith('>')) {
						try {
							await reply(util.format(await eval(`(async () => {${body.slice(1)}})()`)))
						} catch (e) {
							await reply(util.format(e))
						}
					}

			}

		} catch (e) {
			const isError = String(e)

			console.log(isError)
		}
	})
}

connectToWA()
