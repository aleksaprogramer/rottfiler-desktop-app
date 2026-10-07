export const generateBasicInfo = (
    data
) => {
    const totalSizeOfEmptySpaceConvertedToGB = (data.total_size_of_empty_space_in_MB / 1024).toFixed(2);

    const html = `
    <div class="empty-file-info">
        <div class="heading-holder">
              <h3>Basic Info</h3>
              <img src="./src/assets/info-circle.png" alt="Info">
            </div>
            <div class="text">
            <p><span>Processed file:</span> ${data.processed_file}</p>
            <p><span>Size of an empty space:</span> ${data.total_size_of_empty_space_in_MB} MB (${totalSizeOfEmptySpaceConvertedToGB} GB)</p>
            <p><span>Total number of bytes:</span> ${data.bytes_statistic.total_bytes}</p>
            <p><span>Total number of bytes that are zeros:</span> ${data.bytes_statistic.zeros_of_bytes}</p>
            <p><span>Total number of bytes that are deleted data:</span> ${data.bytes_statistic.deleted_data_bytes}</p>
            <p><span>Percentage of zeros:</span> ${data.percentages.zeros_percentage} %</p>
            <p><span>Percentage of deleted data:</span> ${data.percentages.data_percentage} %</p>
        </div>
    </div>`;

    return html;
};