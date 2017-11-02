<template>
    <div v-loading.fullscreen.lock="loading">
        <iframe :src="liveUrl" id="frVideo" frameborder="0" width="100%" />
    </div>
</template>

<script>
import Vue from 'vue';
import { post } from '../util/agentAxios';
import 'element-ui/lib/theme-default/index.css';
import {  Message } from 'element-ui';
import { getVideoUrl } from '../api/anonymous'
export default {
    data: function () {
        return {
            liveUrl: "",
            invitationId: "",
            loading: false,
        }
    },
    methods: {
        setIframe() {
            document.getElementById('frVideo').style.height = document.body.clientHeight - 10 + "px";
        },
        getVideo() {
            if (!this.invitationId) {
                Message({
                    message: '邀请码不存在',
                    type: 'warning'
                });
                return;
            }
            this.loading = true;
            getVideoUrl({ STno: this.invitationId }).then(ret => {
                if (ret.data.status == 0) {
                    this.liveUrl = ret.data.result;
                }
                else {
                    Message({
                        message: ret.data.info,
                        type: 'warning'
                    });
                }
                this.loading = false;
            }).catch(() => { this.loading = false; });;
        }
    },
    created() {
        this.invitationId = this.$route.query.invitationNo;
    },
    mounted() {
        this.getVideo();
        this.setIframe();
    }
}
</script>