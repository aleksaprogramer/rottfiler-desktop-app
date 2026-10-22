import { convertBytes } from "./convertBytes.js";

export const generateBasicInfo = (
    data
) => {
    const totalSizeOfEmptySpaceConvertedToGB = (data.total_size_of_empty_space_in_MB / 1024).toFixed(2);
    const { bytesToMB: totalMB, bytesToGB: totalGB } = convertBytes(data.bytes_statistic.total_bytes);
    const { bytesToMB: zerosMB, bytesToGB: zerosGB } = convertBytes(data.bytes_statistic.zeros_of_bytes);
    const { bytesToMB: deletedDataMB, bytesToGB: deletedDataGB } = convertBytes(data.bytes_statistic.deleted_data_bytes);

    const html = `
    <div class="empty-file-info">

            <div class="row">
              <div class="hashes">
                <div class="hash">
                  <h3>MD5</h3>
                  <p>c7d7e2da731ffe666dbf50a547e23aed</p>
                </div>

                <div class="hash">
                  <h3>SHA-256</h3>
                  <p>e674774c89e4d056a332e26bc0b9d985382b809a60a5ca56e1e328f06ef5d665</p>
                </div>

                <div class="hash">
                  <h3>SHA-1</h3>
                  <p>62c10099fea590dbc9ca02a6c357fc8f55983aac</p>
                </div>
              </div>

              <div class="empty-file">
                <div class="text">
                  <h3>Input file</h3>
                  <p>${data.filename}</p>

                  <h3>Date ID</h3>
                  <p>${data.date_id}</p>

                  <h3>Size of empty space</h3>
                  <p>${totalSizeOfEmptySpaceConvertedToGB} GB (${data.total_size_of_empty_space_in_MB} MB)</p>
                </div>

                <div class="img-holder">
                  <img src="./src/assets/file.png" alt="File">
                </div>
              </div>
            </div>

            <div class="bytes-info">
              <div class="bytes">
                <h3>Total Bytes</h3>
                <h4>${totalGB} GB</h4>
                <p>100 %</p>
              </div>

              <div class="bytes">
                <h3>Total Deleted Data</h3>
                <h4>${deletedDataGB} GB</h4>
                <p>${data.percentages.data_percentage} %</p>
              </div>

              <div class="bytes">
                <h3>Total Zeros</h3>
                <h4>${zerosGB} GB</h4>
                <p>${data.percentages.zeros_percentage} %</p>
              </div>
            </div>

          </div>`;

    return html;
};