export const handbook = {
  "punishments": [
    {
      "title": "SPAM / FLOOD / COPYPASTA",
      "lines": [
        "Warn",
        "30m Timeout",
        "1h Timeout",
        "3h Timeout",
        "6h Timeout"
      ],
      "severity": "high"
    },
    {
      "title": "SLURS",
      "lines": [
        "F-slur, N-word, or other racist slurs = instant ban",
        "6h Timeout",
        "12h Timeout",
        "24h Timeout",
        "BAN"
      ],
      "severity": "critical"
    },
    {
      "title": "SUSPECTED UNDERAGE",
      "lines": [
        "Jail if age is not known → Have them appeal in the appeal server",
        "If they confirm underage → BAN"
      ],
      "severity": "critical"
    },
    {
      "title": "NSFW / NSFW REFS",
      "lines": [
        "Any form of NSFW not accepted",
        "1d/24hr Timeout (mild NSFW, soft porn)",
        "BAN (strong NSFW, hardcore porn)"
      ],
      "severity": "critical"
    },
    {
      "title": "BORDERLINE NSFW",
      "lines": [
        "Warn",
        "12h Timeout",
        "24h Timeout",
        "BAN"
      ],
      "severity": "high"
    },
    {
      "title": "CHANNEL MISUSE",
      "lines": [
        "Warn",
        "1h Timeout",
        "3h Timeout",
        "6h Timeout",
        "12h Timeout"
      ],
      "severity": "medium"
    },
    {
      "title": "PEDO BEHAVIOR/JOKES/COMMENTS",
      "lines": [
        "Cruz's audience is majority underage",
        "INSTANT BAN - Deal with immediately and harshly"
      ],
      "severity": "critical"
    },
    {
      "title": "ENCOURAGING RULE BREAKING",
      "lines": [
        "Warn",
        "1h Timeout",
        "1d/24hr Timeout",
        "Jail",
        "BAN"
      ],
      "severity": "high"
    },
    {
      "title": "NOT SPEAKING ENGLISH/FONTS",
      "lines": [
        "Verbal & delete",
        "30m Timeout",
        "1h Timeout",
        "3h Timeout",
        "6h Timeout"
      ],
      "severity": "medium"
    },
    {
      "title": "EXCESSIVE SWEARING",
      "lines": [
        "Warn",
        "1h Timeout",
        "3h Timeout",
        "6h Timeout",
        "12h Timeout"
      ],
      "severity": "medium"
    },
    {
      "title": "PUBLIC SELF PROMO",
      "lines": [
        "Redirect to self-promo channel",
        "Warn",
        "2h Timeout",
        "4h Timeout"
      ],
      "severity": "medium"
    },
    {
      "title": "PRIVATE SELF PROMO / DM ADVERTISING",
      "lines": [
        "2h Timeout",
        "4h Timeout",
        "6h Timeout",
        "12h Timeout",
        "24h Timeout",
        "BAN"
      ],
      "severity": "high"
    },
    {
      "title": "EXCESSIVE DRAMA",
      "lines": [
        "Warn",
        "6h Timeout",
        "12h Timeout",
        "24hr/1d Timeout",
        "BAN"
      ],
      "severity": "high"
    },
    {
      "title": "INAPPROPRIATE/OFFENSIVE JOKES",
      "lines": [
        "Verbal",
        "Jail",
        "BAN"
      ],
      "severity": "high"
    }
  ],
  "staff": [
    {
      "title": "Your Role",
      "lines": [
        "Maintain a safe, well-run server. This means:",
        "Monitor chat",
        "Enforce rules consistently, without bias",
        "Assist members with reasonable support",
        "Report serious issues to higher-ups",
        "Stay active and engaged",
        "Assist with tickets when needed (Appeals Server)"
      ],
      "severity": null
    },
    {
      "title": "3-Strike Demotion System",
      "lines": [
        "0️⃣ Start: 0 strikes",
        "1️⃣ Strike 1: Lose staff for 24 hours",
        "2️⃣ Strike 2: Lose staff for a while",
        "3️⃣ Strike 3: Removed permanently (unless higher-up/Cruz says otherwise)",
        "Big enough reason = instant/full demotion, no strikes needed"
      ],
      "severity": null
    },
    {
      "title": "Promotions",
      "lines": [
        "Path: Jr. Lifeguard → Lifeguard → Admin (case-by-case)",
        "Based on: Activity, ModStats, ticket/drama handling",
        "Check your level: ?rank or ?level",
        "Check ModStats: ?mh (staff commands)",
        "Time in role: Check audit logs or remember start date"
      ],
      "severity": null
    },
    {
      "title": "Conduct",
      "lines": [
        "Be professional and mature — always",
        "Stay calm, clear, and neutral (especially during conflict)",
        "No favoritism, no bad peer pressure",
        "Lead by example — on and off duty",
        "Follow all staff and member rules yourself"
      ],
      "severity": null
    },
    {
      "title": "Confidentiality",
      "lines": [
        "Handbook and staff business are confidential",
        "No discussing staff info outside staff chats/GCS unless Cruz/manager permits",
        "Leaking = risk of temp or perm demotion"
      ],
      "severity": null
    },
    {
      "title": "Accountability",
      "lines": [
        "Always give a reason for bans/jails — no reason = strike, repeated = demotion risk",
        "Higher-ups have final say — no arguing it",
        "Every mod action needs proof posted in the proof channel",
        "Doxxing actions must be manually banned/hardbanned by managers only",
        "Don't punish from automod logs — automod already handles the verbal warning"
      ],
      "severity": null
    },
    {
      "title": "Other Rules",
      "lines": [
        "Refrain from contacting Cruz for staff matters; contact a manager/higher-up",
        "Announcements (if you have perms): only 3 people may reply per announcement",
        "Support tickets: One person per ticket",
        "Taking a break: Check \"availabilities\" in staff channel or DM a manager — your mental health matters more than modding",
        "General inactivity can delay promotions",
        "2FA required for all mod/admin/management perms → Setup Guide"
      ],
      "severity": null
    }
  ],
  "actions": [
    {
      "title": "Verbal Warning",
      "lines": [
        "When: Minor first-time offense",
        "How: Politely remind the user of the rules"
      ],
      "severity": null
    },
    {
      "title": "Official Warning",
      "lines": [
        "When: Repeated minor offense",
        "Bot: !warn @user [reason]"
      ],
      "severity": null
    },
    {
      "title": "Timeout (Tm)",
      "lines": [
        "Duration: 30m to 24h depending on severity",
        "Bot: !timeout @user [duration] [reason]"
      ],
      "severity": null
    },
    {
      "title": "Jail",
      "lines": [
        "When: Serious violations, pending appeal",
        "Note: User cannot send messages until released"
      ],
      "severity": null
    },
    {
      "title": "Kick",
      "lines": [
        "When: Serious violation, user may reform",
        "Note: Can rejoin with new invite"
      ],
      "severity": null
    },
    {
      "title": "Ban",
      "lines": [
        "When: Severe violations, raiders, bots",
        "Tip: Delete recent messages for spammers"
      ],
      "severity": null
    }
  ],
  "scenarios": [
    {
      "title": "Spam Attack",
      "lines": [
        "Ban the spammer(s) immediately",
        "Delete spam messages",
        "Enable slowmode",
        "Raise verification level if needed",
        "Alert other mods"
      ],
      "severity": null
    },
    {
      "title": "NSFW Content",
      "lines": [
        "Delete immediately",
        "Screenshot for evidence",
        "1d timeout (soft) or BAN (hardcore)"
      ],
      "severity": null
    },
    {
      "title": "Inappropriate Jokes",
      "lines": [
        "1st: Verbal",
        "2nd: Jail",
        "3rd: Ban"
      ],
      "severity": null
    },
    {
      "title": "Suspected Underage",
      "lines": [
        "Jail the user",
        "Ask them to appeal in appeal server",
        "If they confirm underage → Ban here"
      ],
      "severity": null
    }
  ]
} as const;
