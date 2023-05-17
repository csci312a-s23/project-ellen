import random
import json
from datetime import date
import pandas as pd
import uuid

daterange = pd.date_range(start="2022-09-01",end="2023-04-01")

users = [
    {
        'id': "cac181a9-e1e2-f2de-a699-2a73a2265208"
    },
    {
        'id': "41acd879-40be-bb4e-b0bf-95e2ddbd321a"
    },
    {
        'id': "a776c2db-5b8a-4b2d-ab11-1d73ec66ddcc"
    },
    {
        'id': "9d676bdc-495d-6985-a621-8785203e5eaf"
    },
    {
        'id': "c1aef312-f87d-a3c0-49e6-c5e9f3164e0f"
    },
    {
        'id': "517807da-0273-2c41-5128-f13ea5cbcdde"
    }
]
majors = [
    'ECON',
    'CSCI',
    'PSCI',
    'NSCI',
    'ENVS'
]

'''
for i in range(50):
    users.append({
        'username':'TESTUSER_'+str(i),
        'id': str(uuid.uuid4()),
        'email': 'testuser_$'+str(i)+'@gmail.com',
        'googleID': 'TESTUSERGOOGLEID_'+str(i),

        'classYear': 2023 + random.randint(0, 3),
        'major': majors[random.randint(0,len(majors)-1)],
    })
'''

posts = []
topics = [
    'Registration',
    'Housing',
    'Dining',
    'Parking',
    'General'
]

for i in range(len(users)*3):
    posts.append({
        'id': i+34,
        'posterID': users[random.randint(0, len(users)-1)]['id'],
        'title': "SEED DATA POST",
        'content': "seed data post ~~ content",
        'category': topics[random.randint(0, len(topics)-1)],
        'created_at': daterange[random.randint(0, len(daterange)-1)].strftime("%m/%d/%Y")
    })


comments = []
for i in range(len(users)*4):
    postID = random.randint(0, len(posts)-1)
    comments.append({
        'id': i+6,
        'commenterID': users[random.randint(0, len(users)-1)]['id'],
        'postID': postID,
        'created_at': posts[postID]['created_at'],
    })


votes = []
for i in range(len(users)*2):
    postID =  random.randint(0, len(posts)-1)
    votes.append({
        'id': i+426,
        'voterID': users[random.randint(0, len(users)-1)]['id'],
        'postID': postID,
        'value': random.randint(-3,4),
        'created_at': posts[postID]['created_at'],
    })

jsonExport = {
    #"UserSeedData": users,
    "PostSeedData": posts,
    "CommentSeedData": comments,
    "VoteSeedData": votes
}

with open('newGenSeedData.json', 'w') as outfile:
    json.dump(jsonExport, outfile)