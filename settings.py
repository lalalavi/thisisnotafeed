from os import environ

SESSION_CONFIGS = [
    dict(
        name='Full_Experiment',
        display_name="The full thing! :D",
        num_demo_participants=20, 
        app_sequence=['instructions', 'hr', 'emotion', 'questionnaire', 'end'],
        bRequireFS=True,
        bCheckFocus=True,
        doc="""
        bRequireFS: bool, require fullscreen.
        bCheckFocus: bool, require checking if page is active.
        """
        ),
    dict(
        name='emotion',
        display_name="emotion stuff",
        num_demo_participants=20, 
        app_sequence=['emotion'],
        ),
    dict(
        name='debug_experiment',
        display_name="debugging that experiment yall",
        num_demo_participants=10, 
        app_sequence=['hr'],
        bRequireFS=False,
        bCheckFocus=False,
    ),
    # dict(
    #     name='Beta_Instructions',
    #     display_name="Only the instructions",
    #     num_demo_participants=10, 
    #     app_sequence=['instructions'],
    #     bRequireFS=True,
    #     bCheckFocus=True,
    # ),
    dict(
        name='Formatting_the_questionnaire',
        display_name="Only the questionnaire",
        num_demo_participants= 4,
        app_sequence=['questionnaire'],
        bRequireFS=True,
        bCheckFocus=True,
    ),
    #    dict(
    #     name='End',
    #     display_name="End",
    #     num_demo_participants= 4,
    #     app_sequence=['end'],
    #     bRequireFS=True,
    #     bCheckFocus=True,
    # ),
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']


# COMMAND FOR DEBUGGING DEPLOYMENT
# heroku logs --tail -a meme-experiment

SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=0.00, doc=""
)

PARTICIPANT_FIELDS = ['dExpiry', 
    'LRmemematrix', 
    'HRmemematrix', 
    'startTime',
    'TotalTime',
    'ProlificID',
    'iOutFocus',
    'iFullscreenChanges',
    'dTimeOutFocus',
    'dPixelRatio',
    'validQuestionnaire',
    ]

SESSION_FIELDS = []

ROOMS = [
    dict(
        name='econ101',
        display_name='Econ 101 class',
        participant_label_file='_rooms/econ101.txt',
    ),
    dict(name='prolific', display_name='Prolific Room (no participant labels)'),
]

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """
ᕕ(ᐛ)ᕗ 
 """

SECRET_KEY = '6932973588929'
