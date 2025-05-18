<template>
  <div class="container">
    <div class="container_box">
      <a-tabs>
        <a-tab-pane :key="1" :title="localeGet('type1')">
          <a-form class="form_box" ref="articleFormRef" layout="vertical" hide-label :model="articleForm" @submit="articleFormSubmit">
            <a-spin :loading="loading" :tip="localeGet('message1')">
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title1') }}</div>
                <a-form-item no-style field="taskId" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-select v-model="articleForm.taskId" :options="taskList" :style="{ width: '40%' }" allow-search :placeholder="localeGet('placeholder1')" />
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title2') }}</div>
                <a-form-item no-style field="way" :rules="[{ required: true, message: localeGet('message3') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="articleForm.way" :options="wayOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title3') }}</div>
                <a-form-item no-style field="titleLang" :rules="[{ required: true, message: localeGet('message4') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="articleForm.titleLang" :options="langOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title4') }}</div>
                <a-form-item no-style field="articleLang" :rules="[{ required: true, message: localeGet('message5') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="articleForm.articleLang" :options="langOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title5') }}</div>
                <a-grid :col-gap="20" :row-gap="10" class="form_content">
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label1') }}</div>
                    <a-form-item no-style field="source">
                      <a-radio-group v-model="articleForm.source" :options="sourceOptions">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-radio-group>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="18" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label2') }}</div>
                    <a-form-item no-style field="lengthFilter">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.lengthFilter === 1">
                          <a-space :size="20">
                            <span>{{ localeGet('label3') }}</span>
                            <a-select v-model="articleForm.lengthFilterVal.min" :options="lengthOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder2')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                            <span>-</span>
                            <span>{{ localeGet('label4') }}</span>
                            <a-select v-model="articleForm.lengthFilterVal.max" :options="lengthOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                          </a-space>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label5') }}</div>
                    <a-form-item no-style field="intelligence">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.intelligence" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="18" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label6') }}</div>
                    <a-form-item no-style field="titleNum">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.titleNum" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.titleNum === 1">
                          <a-space :size="20">
                            <a-radio-group v-model="articleForm.titleNumVal" :options="titleNumOptions">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-radio-group>
                          </a-space>
                        </template>
                        <template v-if="articleForm.titleNum === 1 && articleForm.titleNumVal === 2">
                          <a-space :size="20">
                            <span>{{ localeGet('label7') }}</span>
                            <a-select v-model="articleForm.titleNumMore.min" :options="titleNumMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                            <span>-</span>
                            <span>{{ localeGet('label8') }}</span>
                            <a-select v-model="articleForm.titleNumMore.max" :options="titleNumMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder5')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                          </a-space>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label9') }}</div>
                    <a-form-item no-style field="autoContent">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.autoContent" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.autoContent === 1">
                          <a-space :size="20">
                            <a-radio-group v-model="articleForm.autoContentVal" :options="autoContentOptions">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-radio-group>
                          </a-space>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label10') }}</div>
                    <a-form-item no-style field="titleAddNum">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.titleAddNum" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label11') }}</div>
                    <a-form-item no-style field="paragraphAddNum">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.paragraphAddNum" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="6" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label12') }}</div>
                    <a-form-item no-style field="paragraphIndent">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.paragraphIndent" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label13') }}</div>
                    <a-form-item no-style field="sensitiveFilter">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.sensitiveFilter === 1">
                          <a-radio-group v-model="articleForm.sensitiveFilterVal" :options="sensitiveOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="articleForm.sensitiveFilter === 1 && articleForm.sensitiveFilterVal === 2">
                          <a-select v-model="articleForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label14') }}</div>
                    <a-form-item no-style field="synonymFilter">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.synonymFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.synonymFilter === 1">
                          <a-radio-group v-model="articleForm.synonymFilterVal" :options="synonymOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="articleForm.synonymFilter === 1 && articleForm.synonymFilterVal === 2">
                          <a-select v-model="articleForm.synonymCustom" :options="synonymCustomOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="24" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label15') }}</div>
                    <a-form-item no-style field="disturb">
                      <a-space :size="20">
                        <a-radio-group v-model="articleForm.disturb" :options="disturbOptions">
                          <template #label="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                          <template #option="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                        </a-radio-group>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label16') }}</div>
                    <a-form-item no-style field="autoLink">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.autoLink" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.autoLink === 1">
                          <a-select v-model="articleForm.autoLinkVal" :options="autoLinkOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label17') }}</div>
                    <a-form-item no-style field="autoImg">
                      <a-space :size="20">
                        <a-switch v-model="articleForm.autoImg" :checked-value="1" :unchecked-value="0" />
                        <template v-if="articleForm.autoImg === 1">
                          <a-select v-model="articleForm.autoImgVal" :options="autoImgOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <template v-if="articleForm.autoImg === 1">
                    <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label18') }}</div>
                      <a-form-item no-style field="imgAlign">
                        <a-space :size="20">
                          <a-radio-group v-model="articleForm.imgAlign" :options="imgAlignOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label19') }}</div>
                      <a-form-item no-style field="autoTitleImg">
                        <a-space :size="20">
                          <a-switch v-model="articleForm.autoTitleImg" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label20') }}</div>
                      <a-form-item no-style field="autoImgAlt">
                        <a-space :size="20">
                          <a-switch v-model="articleForm.autoImgAlt" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label21') }}</div>
                      <a-form-item no-style field="autoImgTitle">
                        <a-space :size="20">
                          <a-switch v-model="articleForm.autoTitleImg" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label22') }}</div>
                      <a-form-item no-style field="imgSpace">
                        <a-space :size="20">
                          <a-switch v-model="articleForm.imgSpace" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label23') }}</div>
                      <a-form-item no-style field="watermark">
                        <a-space :size="20">
                          <a-radio-group v-model="articleForm.watermark" :options="watermarkOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label24') }}</div>
                      <a-form-item no-style field="titleImg">
                        <a-space :size="20">
                          <a-radio-group v-model="articleForm.titleImg" :options="titleImgOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="24" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label25') }}</div>
                      <a-form-item no-style field="imgPosition">
                        <a-space :size="20">
                          <a-radio-group v-model="articleForm.imgPosition" :options="imgPositionOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                  </template>
                </a-grid>
              </div>
              <div class="form_btn form_btnp">
                <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('btn1') }}</a-button>
              </div>
            </a-spin>
            <div class="form_explain">
              <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
              <div>{{ localeGet('content1') }}</div>
              <div>{{ localeGet('content2') }}</div>
              <div>{{ localeGet('content3') }}</div>
            </div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane :key="2" :title="localeGet('type2')">
          <a-form class="form_box" ref="washDraftFormRef" layout="vertical" hide-label :model="washDraftForm" @submit="washDraftFormSubmit">
            <a-spin :loading="loading" :tip="localeGet('message1')">
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title6') }}</div>
                <a-form-item no-style field="taskId" :rules="[{ required: true, message: localeGet('message6') }]" :validate-trigger="['change', 'blur']">
                  <a-space direction="vertical" :style="{ width: '100%' }">
                    <div class="form_desc">{{ localeGet('message7') }}</div>
                    <a-upload :auto-upload="false" v-model="addFiles" @change="handleAddFileChange" :limit="1" accept=".zip," action="/"></a-upload>
                  </a-space>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title7') }}</div>
                <a-form-item no-style field="way" :rules="[{ required: true, message: localeGet('message8') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="washDraftForm.way" :options="wayOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title8') }}</div>
                <a-form-item no-style field="titleLang" :rules="[{ required: true, message: localeGet('message9') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="washDraftForm.titleLang" :options="langOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title">{{ localeGet('title9') }}</div>
                <a-form-item no-style field="articleLang" :rules="[{ required: true, message: localeGet('message10') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="washDraftForm.articleLang" :options="langOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title5') }}</div>
                <a-grid :col-gap="20" :row-gap="10" class="form_content">
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label26') }}</div>
                    <a-form-item no-style field="source">
                      <a-radio-group v-model="articleForm.source" :options="sourceOptions">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-radio-group>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label27') }}</div>
                    <a-form-item no-style field="formatFilter">
                      <a-checkbox-group v-model="articleForm.formatFilter" :options="formatOptions">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label28') }}</div>
                    <a-form-item no-style field="sensitiveFilter">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="washDraftForm.sensitiveFilter === 1">
                          <a-radio-group v-model="washDraftForm.sensitiveFilterVal" :options="sensitiveOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="washDraftForm.sensitiveFilter === 1 && washDraftForm.sensitiveFilterVal === 2">
                          <a-select v-model="washDraftForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label29') }}</div>
                    <a-form-item no-style field="sensitiveTitleFilter">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.sensitiveTitleFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="washDraftForm.sensitiveTitleFilter === 1">
                          <a-radio-group v-model="washDraftForm.sensitiveTitleFilterVal" :options="sensitiveOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="washDraftForm.sensitiveTitleFilter === 1 && washDraftForm.sensitiveTitleFilterVal === 2">
                          <a-select v-model="washDraftForm.sensitiveTitleCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label30') }}</div>
                    <a-form-item no-style field="rewrite">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.rewrite" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label31') }}</div>
                    <a-form-item no-style field="synonymFilter">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.synonymFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="washDraftForm.synonymFilter === 1">
                          <a-radio-group v-model="washDraftForm.synonymFilterVal" :options="synonymOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="washDraftForm.synonymFilter === 1 && washDraftForm.synonymFilterVal === 2">
                          <a-select v-model="washDraftForm.synonymCustom" :options="synonymCustomOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="24" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label32') }}</div>
                    <a-form-item no-style field="disturb">
                      <a-space :size="20">
                        <a-radio-group v-model="washDraftForm.disturb" :options="disturbOptions">
                          <template #label="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                          <template #option="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                        </a-radio-group>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label33') }}</div>
                    <a-form-item no-style field="autoLink">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.autoLink" :checked-value="1" :unchecked-value="0" />
                        <template v-if="washDraftForm.autoLink === 1">
                          <a-select v-model="washDraftForm.autoLinkVal" :options="autoLinkOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label34') }}</div>
                    <a-form-item no-style field="autoImg">
                      <a-space :size="20">
                        <a-switch v-model="washDraftForm.autoImg" :checked-value="1" :unchecked-value="0" />
                        <template v-if="washDraftForm.autoImg === 1">
                          <a-select v-model="washDraftForm.autoImgVal" :options="autoImgOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-select>
                        </template>
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <template v-if="washDraftForm.autoImg === 1">
                    <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label35') }}</div>
                      <a-form-item no-style field="imgAlign">
                        <a-space :size="20">
                          <a-radio-group v-model="washDraftForm.imgAlign" :options="imgAlignOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label36') }}</div>
                      <a-form-item no-style field="autoTitleImg">
                        <a-space :size="20">
                          <a-switch v-model="washDraftForm.autoTitleImg" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label37') }}</div>
                      <a-form-item no-style field="autoImgAlt">
                        <a-space :size="20">
                          <a-switch v-model="washDraftForm.autoImgAlt" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label38') }}</div>
                      <a-form-item no-style field="autoImgTitle">
                        <a-space :size="20">
                          <a-switch v-model="washDraftForm.autoTitleImg" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="6" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label39') }}</div>
                      <a-form-item no-style field="imgSpace">
                        <a-space :size="20">
                          <a-switch v-model="washDraftForm.imgSpace" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label40') }}</div>
                      <a-form-item no-style field="watermark">
                        <a-space :size="20">
                          <a-radio-group v-model="washDraftForm.watermark" :options="watermarkOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                  </template>
                </a-grid>
              </div>
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title10') }}</div>
                <div class="form_content">
                  <div class="form_content_item">
                    <div class="flex_box form_content_top">
                      <div class="form_label">{{ localeGet('label41') }}</div>
                      <a-form-item no-style field="include">
                        <a-radio-group v-model="washDraftForm.include" :options="includeOptions">
                          <template #label="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                          <template #option="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                        </a-radio-group>
                      </a-form-item>
                    </div>
                    <div class="form_content_input">
                      <a-input-tag v-model="washDraftForm.includeKeyword" :placeholder="localeGet('placeholder6')" allow-clear />
                    </div>
                  </div>
                  <div class="form_content_item">
                    <div class="flex_box form_content_top">
                      <div class="form_label">{{ localeGet('label42') }}</div>
                      <a-form-item no-style field="exclude">
                        <a-radio-group v-model="washDraftForm.exclude" :options="excludeOptions">
                          <template #label="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                          <template #option="{ data }">
                            <span>{{ localeGet(data?.label) }}</span>
                          </template>
                        </a-radio-group>
                      </a-form-item>
                    </div>
                    <div class="form_content_input">
                      <a-input-tag v-model="washDraftForm.excludeKeyword" :placeholder="localeGet('placeholder6')" allow-clear />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form_btn form_btnp">
                <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('btn1') }}</a-button>
              </div>
            </a-spin>
            <!-- <div class="form_explain">
              <div class="form_explain_title">工具介绍：</div>
              <div>1、文章素材长度仅针对网络采集文章有效，AI生成无效；多标题生成目录只针对2个及以上的小标题生效；</div>
              <div>2、标准模式洗稿规则可读性最强，极致模式洗稿规则原创度最高，原创规则不仅局限于同义词替换，有更多复杂的规则；</div>
              <div>3、根据行业领域的需要，可设置自定义词库，来针对性更好的处理本行业领域内的敏感词和同义词。</div>
            </div> -->
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { titleTaskList } from '@/api/apps/tools/title';
import { articleTaskAdd, articleTaskAddText, articleTaskAddXg } from '@/api/apps/tools/article';
import { getListFromZip } from '@/utils';
import { articleFormDefault, washDraftFormDefault, wayOptions, langOptions, sourceOptions, lengthOptions, titleNumOptions, titleNumMinOptions, titleNumMaxOptions, autoContentOptions, sensitiveOptions, customOptions, synonymOptions, synonymCustomOptions, disturbOptions, autoLinkOptions, autoImgOptions, watermarkOptions, titleImgOptions, imgPositionOptions, imgAlignOptions, formatOptions, includeOptions, excludeOptions, orderOptions } from '../utils/config';

import localeConfig from './zh-CN.js';
import { useRouter } from 'vue-router';
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data) localeData.value = data;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
//@ts-ignore
if (window.microApp) window.microApp.addDataListener(dataListener, true);

const router = useRouter();
const loading = ref(false);

// 标题生成文章
const taskList = ref([]);
// 获取任务列表
const getTaskList = async () => {
  try {
    const res = await titleTaskList({
      page: 1,
      limit: 100,
    });
    taskList.value = res.data.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  } catch (error) {
    console.log(error);
  }
};
getTaskList();
const articleForm = ref({ ...articleFormDefault });

// 标题生成文章提交
const articleFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      articleTaskAdd(articleForm.value)
        .then((res) => {
          Message.success(localeGet('message11'));
          router.push({
            name: 'ArticleTask',
          });
        })
        .catch(() => {});
    } catch (err) {
      Message.error(err.message);
    } finally {
      loading.value = false;
    }
  } else {
    const list = Object.keys(errors);
    if (list.length > 0) Message.error(errors[list[0]].message);
  }
};
// 本地文章在线洗稿
const washDraftForm = ref({ ...washDraftFormDefault });
const addFiles = ref([]);
const page = ref(0);
const percent = ref(0);
const size = ref(500);
const textList = ref([]);
const handleAddFileChange = async (fileList) => {
  let list;
  if (fileList.length === 0) {
    textList.value = [];
    return;
  }
  list = await getListFromZip(fileList[0].file);
  if (list.length === 0) {
    Message.warning(localeGet('message12'));
    return;
  }
  textList.value = list;
};
const washDraftFormSubmit = async () => {
  if (loading.value) return;
  page.value = 0;
  percent.value = 0;
  loading.value = true;
  if (textList.value.length === 0) {
    Message.warning(localeGet('message13'));
    return;
  }
  // 包含关键词
  if (washDraftForm.value.includeKeyword.length) {
    if (washDraftForm.value.include) {
      textList.value = textList.value.filter((item) => washDraftForm.value.includeKeyword.some((char) => item.title.includes(char)));
    } else {
      textList.value = textList.value.filter((item) => washDraftForm.value.includeKeyword.every((char) => item.title.includes(char)));
    }
  }
  // 不包含关键词
  if (washDraftForm.value.excludeKeyword.length) {
    if (washDraftForm.value.exclude) {
      textList.value = textList.value.filter((item) => !washDraftForm.value.excludeKeyword.some((char) => item.title.includes(char)));
    } else {
      textList.value = textList.value.filter((item) => !washDraftForm.value.excludeKeyword.every((char) => item.title.includes(char)));
    }
  }
  if (textList.value.length === 0) {
    Message.warning(localeGet('message14'));
    return;
  }

  try {
    const { data } = await articleTaskAddText({ title: textList.value[0].title, number: textList.value.length });
    for (let i = 0; i < textList.value.length; i++) {
      page.value += 1;
      const arr = textList.value.slice(i, i + size.value);
      await articleTaskAddXg({ data: arr, tid: data.id, page: page.value, ...washDraftForm.value });
      percent.value = Math.round(((i + size.value) / textList.value.length) * 100) / 100;
    }
    percent.value = 1;
    textList.value = [];
    Message.success(localeGet('message11'));
    router.push({
      path: '/webmaster-tools/seo-writing/article/article-task'
    });
  } catch (err) {
    Message.error(err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<script>
export default {
  name: 'ArticleForm', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
