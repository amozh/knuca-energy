#!/usr/bin/env bash
set -e
CERT=${1}
REMOTE_HOST=${2}
REMOTE_USER=${3}

echo =====================================
echo Releasing to ${REMOTE_USER}@${REMOTE_HOST}. Cert: ${CERT}
echo =====================================

read -p "Press enter to continue"

REMOTE_FOLDER="~/energy/hosted"

DIST_FOLDER="dist"

function runSSH {
    COMMAND_TO_RUN="${1}"
    ssh -i ${CERT} ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND_TO_RUN}
}

function scpToRemote {
  LOCAL_FILE=${1}
  REMOTE_FOLDER_TO_PLACE_FILE=${2}
  SCP_OPTS=${3}
  scp -i ${CERT} ${SCP_OPTS} ${LOCAL_FILE} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_FOLDER_TO_PLACE_FILE}
}

function prepare {
  echo "Cleaning DIST files in ${REMOTE_FOLDER}"
  runSSH "rm -r ${REMOTE_FOLDER}/*"
}

#Prerequicities
runSSH "mkdir -p ${REMOTE_FOLDER}"

prepare

echo Copying dist files into ${REMOTE_FOLDER}
scpToRemote "${DIST_FOLDER}/*" ${REMOTE_FOLDER} '-r'

exit
