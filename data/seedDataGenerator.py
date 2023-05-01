import random
import json
from datetime import date
import pandas as pd

daterange = pd.date_range(start="2022-09-01",end="2023-04-01")

users = []
majors = [
    'ECON',
    'CSCI',
    'PSCI',
    'NSCI',
    'ENVS'
]
for i in range(50):
    users.append({
        'id': i,
        'classYear': 2023 + random.randint(0, 3),
        'major': majors[random.randint(0,len(majors)-1)],
    })


posts = []
topics = [
    'Registration',
    'Housing',
    'Dining',
    'Parking'
]

for i in range(len(users)*5):
    posts.append({
        'id': i,
        'posterID': random.randint(0, len(users)-1),
        'category': topics[random.randint(0, len(topics)-1)],
        'created_at': daterange[random.randint(0, len(daterange)-1)].strftime("%m/%d/%Y")
    })


comments = []
for i in range(len(users)*10):
    postID = random.randint(0, len(posts)-1)
    comments.append({
        'id': i,
        'commenterID': random.randint(0, len(users)-1),
        'postID': postID,
        'created_at': posts[postID]['created_at'],
    })


votes = []
for i in range(len(users)*50):
    postID =  random.randint(0, len(posts)-1)
    votes.append({
        'id': i,
        'voterID': random.randint(0, len(users)-1),
        'postID': postID,
        'value': random.randint(-3,4),
        'created_at': posts[postID]['created_at'],
    })

jsonExport = {
    "UserSeedData": users,
    "PostSeedData": posts,
    "CommentSeedData": comments,
    "VoteSeedData": votes
}

with open('GenSeedData.json', 'w') as outfile:
    json.dump(jsonExport, outfile)