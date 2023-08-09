stie : https://lastpeople.web.app

https://firebase.google.com/codelabs/firebase-web#0


$ yarn serve
$ yarn build


# VS 터미널
$ firebase login
$ firebase projects:list
$ firebase use --add
$ firebase init // deploy 폴더지정 (dist)
$ yarn build // dist 폴더에 빌드파일 출력 됨
$ firebase deploy // dist 폴더를 firebase 에 배포함


## oracle 터미널 접속
$ chmod 400 /Users/admin/Documents/oracle/gridftp/ssh-key-2022-10-24.key
$ ssh -i /Users/admin/Documents/oracle/ubuntu/ssh-key-2023-07-19.key \
ubuntu@152.70.95.51

## centos
$ ssh -i /Users/admin/Documents/oracle/gridftp/ssh-key-2022-10-24.key \
opc@132.145.90.49
$ scp -r -i /Users/admin/Documents/oracle/gridftp/ssh-key-2022-10-24.key \
/Users/admin/Documents/oracle/gridftp/gridftp opc@132.145.90.49:/home/opc

## ubuntu
$ ssh -i /Users/admin/Documents/oracle/gridftp/ssh-key-2022-10-24.key \
ubuntu@193.122.112.179
$ scp -r -i /Users/admin/Documents/oracle/gridftp/ssh-key-2022-10-24.key \
/Users/admin/Documents/oracle/gridftp/gridftp \
ubuntu@193.122.112.179:/home/ubuntu

## oracle 배포방법
$ cd /Users/admin/Documents/oracle/ubuntu
$ scp -r -i /Users/admin/Documents/oracle/ubuntu/ssh-key-2023-07-19.key \
/Users/admin/Documents/vuejs/firebase/dist \
ubuntu@152.70.95.51:/home/ubuntu/docker/data/was01/tomcat/webapps/
